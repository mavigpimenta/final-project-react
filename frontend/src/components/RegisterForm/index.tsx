import Button from "../Button";
import { Select } from "../Select";
import { FormWrapper } from "./styled.module";
import { Date } from "../Date"
import { Input } from "../Input";
import { useLanguage } from "../../context/LanguageContext";

interface RegisterFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  edv: string;
  setEdv: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  date: Date | null;
  setDate: (value: Date | null) => void;
  role: string;
  setRole: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, edv, setEdv, name, setName, date, setDate, role, setRole, password, setPassword, confirmPassword, setConfirmPassword }) => {
  const { selectedLanguage, setLanguage } = useLanguage();

  return (
    <FormWrapper onSubmit={onSubmit}>
      <Input label="EDV" type="text" value={edv} onChange={(e) => setEdv(e.target.value)} />
      <Input label={selectedLanguage === 'pt-BR' ? 'Nome Completo' : selectedLanguage === 'en-US' ? 'Full Name' : 'Vollständiger Name'} type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <Date selected={date} onChange={(date) => setDate(date)} placeholder="DD/MM/YYYY" />
      <Select label={selectedLanguage === 'pt-BR' ? 'Cargo' : selectedLanguage === 'en-US' ? 'Role' : 'Position'} value={role} onChange={(e) => setRole(e.target.value)} />
      <Input label={selectedLanguage === 'pt-BR' ? 'Senha' : selectedLanguage === 'en-US' ? 'Password' : 'Passwort' } type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input label={selectedLanguage === 'pt-BR' ? 'Confirmar Senha' : selectedLanguage === 'en-US' ? 'Confirm Password' : 'Passwort Bestätigen'} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <Button>{selectedLanguage === 'pt-BR' ? 'Registrar' : selectedLanguage === 'en-US' ? 'Register' : 'Registrieren'}</Button>
    </FormWrapper>
  );
};