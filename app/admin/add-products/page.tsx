import Container from "@/app/components/Container";
import FormWrap from "@/app/components/Products/FormWrap";
import AddProductForm from "./AddProductForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/Products/NullData";



const AddProducts = async() => {

    const currentUser = await getCurrentUser();

    if(!currentUser || currentUser.role !== 'ADMIN'){
        return <NullData title="Access denied"/>
    }

    return (
        <div className="flex-1">
            <Container>
                <FormWrap>
                    <AddProductForm/>
                </FormWrap>
            </Container>
        </div>
    )
}

export default AddProducts;