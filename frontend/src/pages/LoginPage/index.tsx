import { useState } from "react";
import { LoginForm } from "../../components/LoginForm";
import { ContentWrapper, Logo, PageWrapper } from "./styled.module";
import LogoImage from '/Logo.svg'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [edv, setEdv] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/user/login', {
        edv: edv,
        password: password,
      });

      const { token } = response.data;

      localStorage.setItem('token', token);

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      localStorage.setItem('role', decodedToken.role);
      navigate('/updatePass')
    } catch (error) {
      console.log('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <Logo src={LogoImage} alt="Logo" />
        <LoginForm edv={edv} setEdv={setEdv} password={password} setPassword={setPassword} onSubmit={handleSubmit} />
      </ContentWrapper>
    </PageWrapper>
  );
};
