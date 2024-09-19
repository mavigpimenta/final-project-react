import { DatePickerWrapper, StyledDatePicker } from "./styled.module";

interface CustomDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
}

export const Date: React.FC<CustomDatePickerProps> = ({selected, onChange, placeholder}) => {
  return (
    <DatePickerWrapper>
      <label>Data de nascimento</label>
      <StyledDatePicker selected={selected} onChange={onChange} dateFormat="dd/MM/yyyy" placeholderText={placeholder} showPopperArrow={false} isClearable />
    </DatePickerWrapper>
  );
};
