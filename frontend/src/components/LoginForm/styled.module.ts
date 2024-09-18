import styled from "styled-components";

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  z-index: 999;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 100%;
    box-shadow: none;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;;