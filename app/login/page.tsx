import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FromWrapRegAndLog from "../components/Products/FromWrapRegAndLog";
import LoginForm from "./LoginForm";


const Login = async() => {

    const currentUser = await getCurrentUser()

    return(
        <Container>
            <FromWrapRegAndLog>
                <LoginForm currentUser={currentUser}/>
            </FromWrapRegAndLog>
        </Container>    
    )
}


export default Login;