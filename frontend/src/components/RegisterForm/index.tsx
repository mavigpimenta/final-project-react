import Button from "../Button";
import { Input } from "../Input";
import { FormWrapper } from "./styled.module";

interface RegisterFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  edv: string;
  setEdv: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, edv, setEdv, password, setPassword }) => {
  return (
    <FormWrapper onSubmit={onSubmit}>
      <Input label="EDV" type="text" value={edv} onChange={(e) => setEdv(e.target.value)} />
      <Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button>Entrar</Button>
    </FormWrapper>
  );
};