import { useState } from "react";
import { RegisterForm } from "../../components/RegisterForm";
import { ContentWrapper, Logo, PageWrapper } from "./styled.module";
import PageEnveloper from "../../components/PageEnveloper";
import LogoImage from '/Logo.svg'
import Worker from "/Worker.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [edv, setEdv] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
    
        const formattedDate = date ? date.toISOString().split('T')[0] : null
        
        try {
            const response = await axios.post('http://localhost:8000/user/register', {
                name,
                birthDate: formattedDate,
                edv,
                password,
                confirmPassword,
                role
            });
            
            toast.success('Usuário Criado');
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.log(error)
            toast.error('Usuário não foi criado');
        }
    }

    return (
        <>
            <PageEnveloper>
                <PageWrapper>
                    <img src={Worker} />
                    <ContentWrapper>
                        <Logo src={LogoImage} alt="Logo" />
                        <RegisterForm edv={edv} setEdv={setEdv} name={name} setName={setName} date={date} setDate={setDate} role={role} setRole={setRole} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} onSubmit={handleSubmit} />
                    </ContentWrapper>
                </PageWrapper>
            </PageEnveloper>
        </>
    )
}

export default RegisterPage;