import { useLanguage } from "../../context/LanguageContext";
import { DatePickerWrapper, StyledDatePicker } from "./styled.module";

interface CustomDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
}

export const Date: React.FC<CustomDatePickerProps> = ({selected, onChange, placeholder}) => {
  const { selectedLanguage, setLanguage } = useLanguage();
  
  return (
    <DatePickerWrapper>
      <label>{selectedLanguage === 'pt-BR' ? 'Data de Nascimento' : 'Birth Date'}</label>
      <StyledDatePicker selected={selected} onChange={onChange} dateFormat="dd/MM/yyyy" placeholderText={placeholder} showPopperArrow={false} isClearable />
    </DatePickerWrapper>
  );
};
