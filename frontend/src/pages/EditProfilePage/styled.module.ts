import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 80vh;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  max-width: 800px;
  width: 80%;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 95%;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }

  @media (min-width: 768px) {
    max-width: 40%;
  }

  @media (min-width: 1024px) {
    max-width: 40%;
  }

  @media (min-width: 1440px) {
    max-width: 30%;
  }
`;

export const Logo = styled.div`
  width: 150px;
  padding: 10px;
`;

export const Worker = styled.img `
  @media (max-width: 767px) {
    display: none;
  }

  @media (min-width: 768px), (max-width: 1023px) {
    width: 35%;
    height: 60%;
  }

  @media (min-width: 1024px) {
    width: 40%;
    height: 65%;
  }

  @media (min-width: 1300px) {
    width: 35%;  
    height: 70%  
  }

  @media (min-width: 1440px) {
    width: 30%;  
    height: 70%  
  }
`