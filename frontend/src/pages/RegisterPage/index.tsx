import { useState } from "react";
import { RegisterForm } from "../../components/RegisterForm";
import { ContentWrapper, Logo, PageWrapper } from "./styled.module";
import PageEnveloper from "../../components/PageEnveloper";
import LogoImage from '/Logo.png'
import Worker from "/Worker.svg";

const RegisterPage = () => {
    const [edv, setEdv] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
                    <RegisterForm edv={edv} setEdv={setEdv} name={name} setName={setName} date={date} setDate={setDate} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} onSubmit={handleSubmit} />
                </ContentWrapper>
            </PageWrapper>
        </PageEnveloper>
    )
}

export default RegisterPage;