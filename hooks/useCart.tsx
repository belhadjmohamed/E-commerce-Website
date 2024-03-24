import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {toast} from "react-hot-toast";


type CartContextType = {
    cartTotalQty : number,
    cartTotalAmount:number,
    cartProducts : CartProductType[] | null
    HandleAddProductToCart : (product : CartProductType) => void
    handleRemoveProductFromCart : (product : CartProductType) => void
    handleCartQtyIncrease : (product : CartProductType) => void
    handleCartQtyDecrease : (product : CartProductType) => void
    handleClearCart : () => void
    paymentIntent : string | null
    handleSetPaymentIntent : (val : string |null ) => void
}

export const CartContext = createContext<CartContextType | null>(null)

interface Props{
    [propName : string] : any
}

export const CartContextProvider = (props : Props) => {

    const[cartTotalQty,setcartTotalQty] = useState(0)
    const [cartProducts, setcartProducts] = useState<CartProductType[] | null>(null)
    const [cartTotalAmount, setcartTotalAmount] = useState(0)
    const [paymentIntent, setpaymentIntent] = useState<string | null>(null)



    useEffect(() => {
        const cartItems : any = localStorage.getItem('eShopCartItems')
        const cProducts : CartProductType[] | null = JSON.parse(cartItems)
        const eShopPaymentIntent : any = localStorage.getItem('eShopPaymentIntent')  
        const paymentIntent : string| null = JSON.parse(eShopPaymentIntent)

        setcartProducts(cProducts);
        setpaymentIntent(paymentIntent);
    },[]);

    const handleSetPaymentIntent = useCallback((val: string |null) => {
        setpaymentIntent(val)
        localStorage.setItem('eShopPaymentIntent', JSON.stringify(val))
    }, [])

    useEffect(() => {
        const getTotals = () => {

            if(cartProducts){
                const {total,qty} = cartProducts?.reduce((acc,item) => {
                    const itemTotal = item.price * item.quantity
                    acc.total += itemTotal
                    acc.qty += item.quantity
                    return acc
                } , {
                    total : 0,
                    qty : 0,
                });
                setcartTotalQty(qty)
                setcartTotalAmount(total)
            };
        };
        getTotals();
    },[cartProducts])

    const HandleAddProductToCart = useCallback((product : CartProductType) => {
        setcartProducts((prev)=> {
            let updatedCart;
            if(prev){
                updatedCart = [...prev, product]
            }else{
                updatedCart = [product]
            }

            
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));

            return updatedCart;
        })
        toast.success('Product added to cart');
    },[]) 


    const handleRemoveProductFromCart = useCallback((product : CartProductType) => {
        if(cartProducts){
            const filteredProducts = cartProducts.filter((item) => {
                return item.id !== product.id
            })

            setcartProducts(filteredProducts)

            toast.success('Product removed');

            localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts));
            
        }
    },[cartProducts])

    const handleCartQtyIncrease = useCallback((product : CartProductType) => {
        let updatedCart;

        if(product.quantity === 99) {
            return toast.error('maximum reached')
        }
        
        if(cartProducts){
            updatedCart = [...cartProducts]

            const existingIndex = updatedCart.findIndex((item) => item.id === product.id);

            if(existingIndex > -1){
                updatedCart[existingIndex].quantity = ++updatedCart[existingIndex].quantity
            }

            setcartProducts(updatedCart)
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))

        }
        
    },[cartProducts])


    const handleCartQtyDecrease = useCallback((product : CartProductType) => {
        let updatedCart;

        if(product.quantity === 1) {
            return toast.error('Minimum reached')
        }
        
        if(cartProducts){
            updatedCart = [...cartProducts]

            const existingIndex = updatedCart.findIndex((item) => item.id === product.id);

            if(existingIndex > -1){
                updatedCart[existingIndex].quantity = --updatedCart[existingIndex].quantity
            }

            setcartProducts(updatedCart)
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))

        }
        
    },[cartProducts])

    const handleClearCart = useCallback(() =>{
        setcartProducts(null);
        setcartTotalQty(0);
        localStorage.setItem('eShopCartItems',JSON.stringify(null))
    },[])

    const value = {
        cartTotalAmount,
        cartTotalQty,
        cartProducts,
        HandleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        paymentIntent,
        handleSetPaymentIntent,
    }
    
    return <CartContext.Provider value={value} {...props}/>
};

export const useCart = () => {
    const context = useContext(CartContext);

    if(context === null) {
        throw new Error('useCart must be used within a CartContextProvider')
    }

    return context

};
