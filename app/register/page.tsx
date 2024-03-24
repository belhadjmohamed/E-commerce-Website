import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FromWrapRegAndLog from "../components/Products/FromWrapRegAndLog";
import RegisterForm from "./RegisterForm";


const Register =async() => {

    const currentUser = await getCurrentUser()

    return(
        <Container>
            <FromWrapRegAndLog>
                <RegisterForm currentUser={currentUser}/>
            </FromWrapRegAndLog>
        </Container>
    )
}

export default Register;
