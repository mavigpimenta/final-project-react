import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { Input } from "../Input";
import { FormWrapper } from "./styled.module";

interface LoginFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  edv: string;
  setEdv: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, edv, setEdv, password, setPassword }) => {
  const navigate = useNavigate();
  
  const handleRegisterClick = () => {
    navigate("/register"); 
  };

  return (
    <FormWrapper onSubmit={onSubmit}>
      <Input label="EDV" type="text" value={edv} onChange={(e) => setEdv(e.target.value)} />
      <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button>Login</Button>
      <Button onClick={handleRegisterClick}>Register</Button>
    </FormWrapper>
  );
};