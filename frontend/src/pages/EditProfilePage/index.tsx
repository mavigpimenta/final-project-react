import { useState } from "react";
import { ContentWrapper, Logo, PageWrapper } from "./styled.module";
import { EditForm } from "../../components/EditForm";
import PageEnveloper from "../../components/PageEnveloper";
import LogoImage from '/Logo.svg'
import Worker from "/FemaleWorker.svg";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ErrorResponse {
    message: string; 
}

const EditProfilePage = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put('http://localhost:8000/user/update', {
                oldPassword,
                newPassword: password,
                confirmPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success('Senha alterada com sucesso')
            console.log(response.data)
        } catch (err) {
            const error = err as AxiosError
            console.log('Erro do backend:', error.response?.data)
            toast.error('Não foi possivel alterar a senha');
            console.log(err)
        }
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