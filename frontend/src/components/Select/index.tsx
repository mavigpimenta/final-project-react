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
        <StyledOption value="">{selectedLanguage === 'pt-BR' ? 'Selecione seu cargo' : selectedLanguage === 'en-US' ? 'Select your role' : 'Wählen Sie Ihre Position aus'}</StyledOption>
        {role == "ADMIN" &&
          <>
            <StyledOption value="ADMIN">{selectedLanguage === 'pt-BR' ? 'Administrador' : selectedLanguage === 'en-US' ? 'Administrator' : 'Administrator'}</StyledOption>
          </>
        } :
        <StyledOption value="INSTRUCTOR">{selectedLanguage === 'pt-BR' ? 'Instrutor' : selectedLanguage === 'en-US' ? 'Instructor' : 'Ausbilder'}</StyledOption>
        <StyledOption value="STUDENT">{selectedLanguage === 'pt-BR' ? 'Estudante' : selectedLanguage === 'en-US' ? 'Student' : 'Student'}</StyledOption>
      </StyledSelect>
    </>
  );
};