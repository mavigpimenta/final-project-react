import { useState } from "react";
import { LoginForm } from "../../components/LoginForm";
import { ContentWrapper, Logo, PageWrapper } from "./styled.module";
import LogoImage from '/Logo.png'

export const LoginPage = () => {
    const [edv, setEdv] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log('Login:', { edv, password });
      };
      
    return (
      <PageWrapper>
        <ContentWrapper>
          <Logo src={LogoImage} alt="Logo" />
          <LoginForm edv={edv} setEdv={setEdv} password={password} setPassword={setPassword} onSubmit={handleSubmit}/>
        </ContentWrapper>
      </PageWrapper>
    );
  };
