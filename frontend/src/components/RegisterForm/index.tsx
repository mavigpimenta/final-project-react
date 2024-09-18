import Button from "../Button";
import { Input } from "../Input";
import { FormWrapper } from "./styled.module";

interface RegisterFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  edv: string;
  setEdv: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, edv, setEdv, name, setName, date, setDate, password, setPassword, confirmPassword, setConfirmPassword }) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    const [day, month, year] = inputDate.split('/');

    if (day && month && year) {
      const parsedDate = new Date(+year, +month - 1, +day);
      if (!isNaN(parsedDate.getTime()) && parsedDate.getDate() === +day) {
        setDate(inputDate);
      } else {
        setDate('');
      }
    } else {
      setDate('');
    }
  };

  return (
    <FormWrapper onSubmit={onSubmit}>
      <Input label="EDV" type="text" value={edv} onChange={(e) => setEdv(e.target.value)} />
      <Input label="Nome completo" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="Data de nascimento" type="date" placeholder="DD/MM/YYYY" value={date} onChange={handleDateChange} />
      <Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input label="Confirmar Senha" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <Button>Entrar</Button>
    </FormWrapper>
  );
};