import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

export const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 0.5rem;
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  padding: 0.75rem;
  font-size: 1rem;
  border: none; 
  border-bottom: 1px solid #ccc; 
  outline: none;
  width: 100%; 
  box-sizing: border-box;
  background-color: transparent;
  color: var(--text-color);

  &:focus {
    border-bottom-color: #007bc0; 
  }

  &::placeholder {
    color: var(--text-color);
  }

  @media (max-width: 768px) {
    padding: 0.65rem;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;