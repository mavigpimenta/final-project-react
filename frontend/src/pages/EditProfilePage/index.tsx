import { useState } from "react";
import { ContentWrapper, Logo, PageWrapper } from "./styled.module";
import { EditForm } from "../../components/EditForm";
import PageEnveloper from "../../components/PageEnveloper";
import LogoImage from '/Logo.svg'
import Worker from "/FemaleWorker.svg";

const EditProfilePage = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    };

    return (
        <PageEnveloper>
            <PageWrapper>
                <img src={Worker} />
                <ContentWrapper>
                    <Logo src={LogoImage} alt="Logo" />
                    <EditForm oldPassword={oldPassword} setOldPassword={setOldPassword} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} onSubmit={handleSubmit} />
                </ContentWrapper>
            </PageWrapper>
        </PageEnveloper>
    )
}

export default EditProfilePage;