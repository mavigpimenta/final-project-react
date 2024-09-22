import styled from "styled-components";

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  gap: 20px;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    box-shadow: none;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`