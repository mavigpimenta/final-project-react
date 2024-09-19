import React, { useState } from 'react';
import { StyledOption, StyledSelect } from './styled.module';

interface SelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = ({ label, value, onChange }) => {
  return (
    <> 
      <label>{label}</label>
      
      <StyledSelect value={value} onChange={onChange}>
        <StyledOption value="">Select an option</StyledOption>
        <StyledOption value="ADMIN">Administrador</StyledOption>
        <StyledOption value="INSTRUCTOR">Instrutor</StyledOption>
        <StyledOption value="STUDENT">Aluno</StyledOption>
      </StyledSelect>
    </>
  );
};