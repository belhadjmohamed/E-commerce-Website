import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/Products/NullData";
import ManageOrdersClient from "./ManageOrdersClient";
import getOrders from "@/actions/getOrders";


const ManageOrders = async() => {

    const orders = await getOrders();

    const currentUser = await getCurrentUser();


    if(!currentUser || currentUser.role !== 'ADMIN'){
        return <NullData title="Access denied"/>
    }

    return (
        <div className="pt-8">
            <Container>
                <ManageOrdersClient orders={orders}/>
            </Container>
        </div>
    )
};


export default ManageOrders;