import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-bottom: 100px;
  gap: 40px;
`;

export const AddButton = styled.button`
  display: flex;
  position: fixed;
  bottom: 8%;
  right: 5%;
  width: 50px;
  height: 50px;
  border-style: none;
  border-radius: 100%;
  background-color: #007BC0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;

  background-image: url("/Add.svg");

  &:hover {
    background-color: #005A87;
  }
`;