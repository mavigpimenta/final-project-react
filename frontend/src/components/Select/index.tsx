import React from 'react';
import { StyledOption, StyledSelect } from './styled.module';
import { useLanguage } from '../../context/LanguageContext';

interface SelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = ({ label, value, onChange }) => {
  const role = localStorage.getItem("role");
  const { selectedLanguage, setLanguage } = useLanguage();

  return (
    <>
      <label>{label}</label>

      <StyledSelect value={value} onChange={onChange}>
        <StyledOption value="">{selectedLanguage === 'pt-BR' ? 'Selecione seu cargo' : 'Select your role'}</StyledOption>
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