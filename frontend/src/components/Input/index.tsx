import { InputWrapper, StyledInput } from "./styled.module";

interface InputProps {
  label?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({ label, type, value, placeholder, onChange, disabled }) => {
  return (
    <InputWrapper>
      <label>{label}</label>
      <StyledInput type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} />
    </InputWrapper>
  );
};
