import { useState } from "react";
import { RegisterForm } from "../../components/RegisterForm";
import { ContentWrapper, Logo, PageWrapper } from "./styled.module";
import PageEnveloper from "../../components/PageEnveloper";
import LogoImage from '/Logo.png'
import Worker from "/Worker.svg";

const RegisterPage = () => {
    const [edv, setEdv] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log('Login:', { edv, password });
    };

    return (
        <PageEnveloper>
            <PageWrapper>
                <img src={Worker} />

                <ContentWrapper>
                    <Logo src={LogoImage} alt="Logo" />
                    <RegisterForm edv={edv} setEdv={setEdv} password={password} setPassword={setPassword} onSubmit={handleSubmit} />
                </ContentWrapper>
            </PageWrapper>
        </PageEnveloper>
    )
}

export default RegisterPage;