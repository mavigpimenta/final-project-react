import PageEnveloper from "../../components/PageEnveloper";
import { MainContainer } from "./styled.module";
import Foto from "/Worker.svg";

const RegisterPage = () => {
    return (
        <PageEnveloper>
            <MainContainer>
                <img src={Foto} />
            </MainContainer>
        </PageEnveloper>
    )
}

export default RegisterPage;