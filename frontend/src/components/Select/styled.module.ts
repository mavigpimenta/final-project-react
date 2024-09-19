import styled from "styled-components";

export const StyledSelect = styled.select`
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #ccc; 
  outline: none;
  width: 100%;
  box-sizing: border-box;
  background: transparent;
  appearance: none;
  color: var(--text-color);

  &:focus {
    border-bottom-color: #007bc0; 
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

export const StyledOption = styled.option`
  padding: 0.5rem;
  font-size: 1rem;
  background: #fff; 
  color: #333;
  border-bottom: 1px solid #eee;
  
  &:nth-child(even) {
    background: #f9f9f9; 
  }

  &:hover {
    background: #eaeaea; 
  }

  &:last-child {
    border-bottom: none;
  }
`;