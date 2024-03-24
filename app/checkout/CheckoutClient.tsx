'use client';
import {StripeElementsOptions, loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckoutForm from './CheckoutForm';
import Button from '../components/Products/Button';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

const CheckoutClient = () => {

    const {cartProducts,paymentIntent,handleSetPaymentIntent} = useCart();
    const [loading,setloading] = useState(false);
    const [error,seterror] = useState(false);
    const [clientSecret, setclientSecret] = useState('');
    const [paymentSuccess, setpaymentSuccess] = useState(false)


    const router = useRouter();

    useEffect(()=> {
        if(cartProducts){
            setloading(true)
            seterror(false)
            
            fetch('/api/create-payment-intent', {
                method: 'POST',
                headers : {'Content-type': 'application/json'},
                body : JSON.stringify({
                    items : cartProducts,
                    payment_intent_id : paymentIntent
                })
            }).then((response) => {
                setloading(false)
                if(response.status === 401){
                    return router.push('/login')
                }

                return response.json()
            }).then((data) => {
                setclientSecret(data.paymentIntent.client_secret)
                handleSetPaymentIntent(data.paymentIntent.id)
            }).catch((error) => {
                console.log("Error",error)
                toast.error("something went wrong")
            })
        }
    } , [cartProducts,paymentIntent,handleSetPaymentIntent,router])

    const options : StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme : 'stripe',
            labels : 'floating'
        }
    }

    const handleSetPaymentSuccess = useCallback((value : boolean) => {
        setpaymentSuccess(value)
    },[])

    return(
        <div className='w-full'>
            {clientSecret && cartProducts && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} handleSetPaymentSuccess={handleSetPaymentSuccess}/>
                </Elements>
            )}
            {loading && <div className='text-center'>Loading checkout...</div>}
            {error && <div className='text-center text-rose-400 '>Something went wrong...</div>}
            {paymentSuccess && 
                <div className='flex items-center flex-col gap-4'>
                    <div className='text-teal-500 text-center'>Payment Success</div>
                    <div className='max-w-[220px] w-full'>
                        <Button label='View your Orders' onClick={() => router.push('/orders')} />
                    </div>
                </div>}
        </div>
    )
}

export default CheckoutClient;