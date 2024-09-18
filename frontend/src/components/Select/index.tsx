import React, { useState } from 'react';
import { StyledOption, StyledSelect } from './styled.module';

interface SelectProps {
  backendUrl: string; 
}

export const Select: React.FC<SelectProps> = ({ backendUrl }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  return (
    <StyledSelect value={selectedOption} onChange={handleChange}>
      <StyledOption value="">Select an option</StyledOption>
      <StyledOption value="ADMIN">Administrador</StyledOption>
      <StyledOption value="INSTRUCTOR">Instrutor</StyledOption>
      <StyledOption value="STUDENT">Aluno</StyledOption>
    </StyledSelect>
  );
};

