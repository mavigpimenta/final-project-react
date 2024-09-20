import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 77vh;

  @media (min-width: 1440px) {
    height: 74vh;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  @media (min-width: 1440px) {
    width: 50%;
    margin-top: 0;
  }

  @media (min-width: 1024px) {
    margin-top: 25px;
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
    height: 70%;
    padding-left: 5rem;
  }
`