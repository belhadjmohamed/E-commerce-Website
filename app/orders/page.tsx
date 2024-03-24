import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/Products/NullData";
import OrderClient from "./OrderClient";
import getOrders from "@/actions/getOrders";
import getOrdersByUserId from "@/actions/getOrdersByUserId";


const Orders = async() => {

    const currentUser = await getCurrentUser();


    if(!currentUser){
        return <NullData title="Access denied"/>
    }

    const orders = await getOrdersByUserId(currentUser.id)

    if(!orders){
        return <NullData title="No orders ..."/>
    }

    return (
        <div className="pt-8">
            <Container>
                <OrderClient orders={orders}/>
            </Container>
        </div>
    )
};


export default Orders;