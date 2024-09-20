import styled from "styled-components";
import backgroundImage from '/ColorBar.svg'

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: url(${backgroundImage}) no-repeat center center;
  background-attachment: fixed;
  background-size: cover;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 2rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
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
    max-width: 60%;
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