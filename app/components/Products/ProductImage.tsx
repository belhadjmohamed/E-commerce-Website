'use client';

import { CartProductType, selectedImgType } from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";

interface ProductImageProps{
    cartProduct: CartProductType,
    product : any,
    handleColorSelect : (value : selectedImgType) => void
}

const ProductImage : React.FC<ProductImageProps> = ({
    cartProduct,
    product,
    handleColorSelect
}) => {
    return (
        <div className="flex flex-col gap-2 h-[500px] md:h-[600px]">
            <div className="relative pt-[70%] w-full border-4">
                <Image src={cartProduct.selectedImg.image} alt={cartProduct.name} fill className="w-full h-full object-contain"/>
            </div>
            <div className="flex flex-row items-center justify-center gap-2 cursor-pointer border h-[200px] ">
                {product.images.map((image: selectedImgType) => {
                    return <div key={image.color} onClick={() => handleColorSelect(image)} className={`relative h-[80%] aspect-square rounded border-teal-300 ${cartProduct.selectedImg.color === image.color ? 'border-[1.5px]' : 'border-none'} `}>
                        <Image src={image.image} alt={image.color} fill className="object-contain"/>
                    </div>
                })}
            </div>

        </div>
    )
}

export default ProductImage;