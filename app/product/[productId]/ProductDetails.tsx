'use client';

import Button from "@/app/components/Products/Button";
import ProductImage from "@/app/components/Products/ProductImage";
import SetColor from "@/app/components/Products/SetColor";
import SetQuantity from "@/app/components/Products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";


import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";


interface ProductDetailsProps {
    product : any
}

const Horizontal = () => {
    return <hr className="w-[30%] my-2" />
}

export type CartProductType = {
    id : string,
    name : string,
    description : string,
    category : string,
    brand : string,
    selectedImg :selectedImgType,
    quantity : number,
    price : number
}

export type selectedImgType = {
    color : string,
    colorCode : string,
    image : string
}

const ProductDetails : React.FC<ProductDetailsProps> = ({product}) => {
    
    const {HandleAddProductToCart,cartProducts} = useCart();
    const [isProductinCart , setisProductinCart] = useState(false);

    const [Cart, setCartProduct] = useState<CartProductType>({
        id : product.id,
        name : product.name,
        description : product.description,
        category : product.category,
        brand : product.brand,
        selectedImg : {...product.images[0]},
        quantity : 1,
        price : product.price,
    });

    const router = useRouter();

    console.log(cartProducts);

    useEffect(() => {
        setisProductinCart(false)
        if(cartProducts){
            const existingindex = cartProducts.findIndex((item) => item.id === product.id)
            if (existingindex > -1){
                setisProductinCart(true);
            }
        }
    },[cartProducts,product.id])
    
    const productRating = product.reviews.reduce((acc :number  ,item:any) => item.rating + acc, 0) / product.reviews.length;
    
    

    const handleColorSelect = useCallback((value: selectedImgType) => { 
        setCartProduct((prev) => ( {...prev, selectedImg: value}))
    },[]);

    
    const handleQtyIncrease =  useCallback(() => {
        setCartProduct((prev) => {
            if(prev.quantity < 99){
                return {...prev, quantity : prev.quantity +1}
            }else{
                return {...prev, quantity : prev.quantity}
            }
        })
    },[])
   

    const handleQtyDecrease =useCallback(() => {
        setCartProduct((prev) => {
            if (prev.quantity > 1){
                return {...prev, quantity : prev.quantity - 1 }
            }else{
                return {...prev, quantity : prev.quantity }
            }
            
        })
    },[])

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImage cartProduct={Cart} product={product} handleColorSelect={handleColorSelect}/>
            <div className="flex flex-row ">
                <div className="flex flex-col gap-1 text-slate-500 text-sm flex-1">
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <div className="flex items-center gap-2">
                    <Rating value={productRating} readOnly />
                    <div>{product.reviews.length} Reviews</div>
                </div>
                <Horizontal/>
                <div className="text-justify">{product.description}</div>
                <Horizontal/>
                <div>
                    <span className="font-semibold">CATEGORY : <span>{product.category}</span></span>
                </div>
                <div>
                    <span className="font-semibold">BRAND : <span>{product.brand}</span></span>
                </div>
                <div className={product.inStock ? 'text-teal-400' : 'text-rose-400'}>{product.inStock ? 'In Stock' : 'Out Of Stock'}</div>
                <Horizontal/>
                {isProductinCart ? <>

                </> : <>
                <SetColor cartProduct={Cart}
                images={product.images}
                handleColorSelect={handleColorSelect}
                />
                <Horizontal/>

                </>}
                </div>
                <div className="flex-[0.8] ">
                <div className="border-2 h-fitcontain  p-4 flex flex-col gap-2">
                    <h1 className="font-bold text-center ">{formatPrice(product.price)}</h1>
                    <hr/>
                    {isProductinCart === false ? <><SetQuantity  cartProduct={Cart} handleQtyIncrease={handleQtyIncrease} handleQtyDecrease={handleQtyDecrease} />
                    <hr/>
                    <div className="max-w-[300px] ">
                    <Button 
                    label="Add To Cart"
                    onClick={()=> HandleAddProductToCart(Cart)} 
                    />
                    </div> </>:<>               
                    <p className="mb-2 text-slate-500 flex items-center gap-1">
                    <MdCheckCircle size={20} className="text-teal-400"/>
                    <span>Product added to chart</span>
                    </p>
                    <div className="max-w-[300px]">
                        <Button label="View Cart" outline onClick={() => router.push("/cart")} />
                    </div></>  }
                </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;