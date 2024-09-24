import React from 'react';
import { StyledOption, StyledSelect } from './styled.module';

interface SelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = ({ label, value, onChange }) => {
  const role = localStorage.getItem("role");

  return (
    <>
      <label>{label}</label>

      <StyledSelect value={value} onChange={onChange}>
        <StyledOption value="">Selecione seu cargo</StyledOption>
        {role == "ADMIN" &&
          <>
            <StyledOption value="ADMIN">Administrador</StyledOption>
          </>
        } :
        <StyledOption value="INSTRUCTOR">Instrutor</StyledOption>
        <StyledOption value="STUDENT">Aluno</StyledOption>
      </StyledSelect>
    </>
  );
};