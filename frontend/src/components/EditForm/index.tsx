import Button from "../Button";
import { Input } from "../Input";
import { FormWrapper } from "./styled.module";

interface EditFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  oldPassword: string;
  setOldPassword: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
}

export const EditForm: React.FC<EditFormProps> = ({ onSubmit, oldPassword, setOldPassword, password, setPassword, confirmPassword, setConfirmPassword }) => {
  return (
    <FormWrapper onSubmit={onSubmit}>
      <Input label="Senha antiga" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
      <Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input label="Confirmar Senha" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <Button>Confirmar</Button>
    </FormWrapper>
  );
};