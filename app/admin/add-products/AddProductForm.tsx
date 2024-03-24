'use client';

import Heading from "@/app/components/Heading";
import Button from "@/app/components/Products/Button";
import CategorieInput from "@/app/components/inputs/CategorieInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import firebaseApp from "@/libs/firebase";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import axios from "axios";
import { useRouter } from "next/navigation";


export type ImageType = {
    color : string ;
    colorCode : string;
    image : File | null;
}

export type UploadedImageType = {
    color : string ;
    colorCode : string;
    image : string;
}

const AddProductForm = () => {

    const [isLoading, setisLoading] = useState(false)

    const[images,setimages] = useState<ImageType[] | null>();
    const [isProductCreated, setisProductCreated] = useState(false);
    const router = useRouter();

    const {register,handleSubmit,setValue,watch,reset,formState : {errors}} = useForm<FieldValues>({
        defaultValues:{
            name : '',
            description : '',
            brand : '',
            category : '',
            inStock : false,
            images : [],
            price: ''
        }
    })

    useEffect(() => {
        setCustomValue("images" , images)
    } , [images]);

    useEffect(()=>{
        if(isProductCreated){
            reset();
            setimages(null);
            setisProductCreated(false);
        }
    },[isProductCreated]);

    const category = watch("category");


    const onsubmit : SubmitHandler<FieldValues> = async(data) => {
        setisLoading(true);
        let uploadedImages : UploadedImageType[] = []

        if(!data.category){
            setisLoading(false)
            return toast.error('Category is not selected')
        }
        
        if(!data.images || data.images.length === 0){
            setisLoading(false)
            return toast.error('Images is not selected')
        }

        const handleImageUploads = async () => {
            toast("Creating product, please wait .....");
            try {
                for (const item of data.images){
                    if(item.image){
                        const fileName = new Date().getTime()+ '-' + item.image.name;
                        const storage = getStorage(firebaseApp);
                        const storageRef = ref(storage, `products/${fileName}`);
                        const uploadTask = uploadBytesResumable(storageRef,item.image);

                        await new Promise<void>((resolve,reject) => {
                            uploadTask.on(
                                'state_changed',
                                (snapshot) => {
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress + '% done');
                                    switch (snapshot.state) {
                                      case 'paused':
                                        console.log('Upload is paused');
                                        break;
                                      case 'running':
                                        console.log('Upload is running');
                                        break;
                                    }
                                },
                                (error) => {
                                    console.log('Error uploading image', error)
                                    reject(error)
                                }, 
                                () => {
                                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                        uploadedImages.push({
                                            ...item,
                                            image: downloadURL
                                        })
                                        console.log('File available at', downloadURL);
                                        resolve()
                                    }).catch(((error) => {
                                        console.log('Error getting the download Url' , error);
                                        reject(error);
                                    }));
                                }
                            )
                        });
                        
                    }
                }
            } catch (error) {
                setisLoading(false);
                console.log('Error handling image uploads', error);
                return toast.error('Error handling image uploads');
            }
        };

        await handleImageUploads();

        const productData = {...data, images : uploadedImages};
        console.log("productData" , productData);

        axios.post('/api/product', productData).then(() => {
            toast.success('Product was created');
            setisProductCreated(true);
            router.refresh();
        }).catch((error) => {
            toast.error('Something went wrong when saving product to db')
        }).finally(() => {
            setisLoading(false);
        });

    };

    const setCustomValue = (id : string ,value : any) => {
        setValue(id,value,{
            shouldValidate: true,
            shouldDirty:true,
            shouldTouch:true,
        })
    }

    const addImageToState = useCallback((value : ImageType) => {
        setimages((prev) => {
            if(!prev){
                return[value];
            }

            return [...prev,value];
        })
    } , [])

    const removeImageFromState = useCallback((value : ImageType) => {
        setimages((prev) => {
            
            if(prev){
                const filteredImages = prev.filter((item) => item.color !== value.color)
                return filteredImages
            }   
            
            return prev
        })
    } , [])

    return(
        <>  
            <Heading title="Add Product" center/>
            <div className="flex flex-row gap-4 justify-between  w-full">
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required/>
            <Input id="price" label="Price" disabled={isLoading} register={register} errors={errors} required type="number" />
            </div>
            <div className="flex flex-row gap-4 w-full">
            <Input id="brand" label="Brand" disabled={isLoading} register={register} errors={errors} required />
            <CustomCheckBox disabled={isLoading} id="inStock" register={register} label="This Product is in stock"/>
            </div>
            <div className="w-full font-medium flex gap-4 justify-between">
                <div className="mb-2 font-semibold">Category<span className="ml-1">:</span></div>
                <div className="flex flex-row gap-2 overflow-auto">
                    {categories.map((item) => {
                        if(item.label === 'All'){
                            return null;
                        }
                        return <div key={item.label} className="col-span">
                            <CategorieInput 
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                            />
                        </div>
                    })}
                </div>
            </div>
            <TextArea id="description" label="Description" disabled={isLoading} register={register} errors={errors} required />
            <div className="w-full flex flex-col flex-wrap gap-4">
                    <div className="font-bold">Select product images and their colors : </div>
            </div>
            <div className="grid grid-cols-2 w-full gap-3">
                {colors.map((item,index) => {
                    return <SelectColor key={index} item={item} addImageToState={addImageToState} removeImageFromState={removeImageFromState} isProductCreated={isProductCreated}/>
                }) }
            </div>
            <Button label={isLoading ? 'Loading...' : 'Add Product'} onClick={handleSubmit(onsubmit)} />
                    
        </>
    )
}

export default AddProductForm;