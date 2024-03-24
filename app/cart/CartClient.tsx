'use client';


import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Products/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { safeUser } from "@/types";
import { useRouter } from "next/navigation";


interface CartClientProps{
    currentUser : safeUser | null
}


const CartClient : React.FC<CartClientProps> = ({currentUser}) => {

    const {cartProducts,cartTotalAmount,handleClearCart} = useCart();

    const router = useRouter();

    if(!cartProducts || cartProducts.length === 0) {
        return <div className="flex flex-col items-center ">
            <div className="text-2xl"> Your cart is empty </div>
            <div>
                <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                    <MdArrowBack />
                    <span>Start Shopping</span>
                </Link>
            </div>
        </div>
    }

    return(
        <div>
            <Heading title="Shopping Cart" center/>
            <div className="flex flex-row justify-between items-center mt-10">
                <div className="flex-[0.9]">
                    <div>
                    {cartProducts && cartProducts.map((item)=> {
                        return <ItemContent key={item.id} item={item} />
                    })}
                    </div>
                </div>
                <div className="mr-5 border-2 p-4">
                    <div className="text-sm flex flex-col gap-3 items-start">
                        <div className="flex justify-between w-full text-base font-semibold">
                            <span>Total order price</span>
                            <span>{formatPrice(cartTotalAmount)}</span>
                        </div>
                        <p className="tewt-slate-500">Taxes and shipping calculated at Checkout</p>
                        <Button outline={currentUser ? false : true} label={currentUser ? "Go To Checkout" : "Login To Checkout"} onClick={() => {currentUser ? router.push('/checkout') : router.push('/login')}} />
                        <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2 mx-auto">
                            <MdArrowBack />
                            <span>Continue Shopping</span>
                        </Link>
                        <div className="w-[90px] mx-auto mt-2">
                            <Button label="Clear Cart" onClick={() => handleClearCart()} small outline/> 
                        </div> 
                    </div>
                </div>
            </div>

 
            
        </div>
    );
};


export default CartClient;