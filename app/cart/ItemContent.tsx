'use client'
import { MdDelete } from "react-icons/md";
import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import SetQuantity from "../components/Products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps {
    item : CartProductType
}

const ItemContent : React.FC<ItemContentProps> = ({item}) => {

    const {handleRemoveProductFromCart,handleCartQtyIncrease,handleCartQtyDecrease} = useCart();

    return(
        <>
        <div className="flex items-center justify-between">
            <div className="flex gap-2 md:gap-4 ">
                <Link href={`/product/${item.id}`}>
                    <div className="relative w-[130px] aspect-square border-2 rounded-lg">
                        <Image src={item.selectedImg.image} alt={item.name} fill className="object-contain w-full h-full  " />
                    </div>
                </Link>
                <div className="flex flex-col justify-evenly ">
                    <Link href={`/product/${item.id}`}>
                        <span className="font-bold">Description :</span> {truncateText(item.description)}
                    </Link>
                    <div> <span className="font-bold">Color :</span> {item.selectedImg.color}</div>
                    <div> <span className="font-bold">Price :</span> {formatPrice(item.price)}</div>
                    <div className="w-[70px] flex gap-2 items-center" onClick={() => handleRemoveProductFromCart(item)}>
                        <div className="hover:cursor-pointer"><MdDelete size={24} /> </div>
                        <button className="text-slate-500 underline" >
                                    Remove
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="justify-self-center"> <SetQuantity cartProduct={item} handleQtyIncrease={()=>handleCartQtyIncrease(item)} handleQtyDecrease={() => handleCartQtyDecrease(item)} /> </div>
                <div className="font-bold"><span className="mr-1 font-semibold"> Total product price :  </span> {formatPrice(item.price * item.quantity)}</div>
            </div>
        </div>
        <hr className="mt-5 mb-5"/>
        </>
    )
}


export default ItemContent;