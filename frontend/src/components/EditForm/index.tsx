import { useLanguage } from "../../context/LanguageContext";
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
  const { selectedLanguage, setLanguage } = useLanguage();
  
  return (
    <FormWrapper onSubmit={onSubmit}>
      <Input label={selectedLanguage === 'pt-BR' ? 'Senha Antiga' : selectedLanguage === 'en-US' ? 'Old Password' : 'Altes Passwort'} type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
      <Input label={selectedLanguage === 'pt-BR' ? 'Nova Senha' : selectedLanguage === 'en-US' ? 'New Password' : 'Neues Passwort'} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input label={selectedLanguage === 'pt-BR' ? 'Confirmar Senha' : selectedLanguage === 'en-US' ? 'Confirm Password' : 'Passwort bestätigen'} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <Button>{selectedLanguage === 'pt-BR' ? 'Confirmar' : selectedLanguage === 'en-US' ? 'Confirm' : 'Bestätigen'}</Button>
    </FormWrapper>
  );
};