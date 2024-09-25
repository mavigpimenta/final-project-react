import styled from "styled-components";

interface UserIconProps {
  bgColor: string;
}

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 73vh;
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

  background-image: url("/Add.png");
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    background-color: #005A87;
  }
`;

export const PostCreator = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const PostCreatorIcon = styled.div<UserIconProps>`
  width: 35px;
  height: 35px;
  position: absolute;
  top: 10px;
  left: -20px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor || "#ccc"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  flex-shrink: 0;

  @media (max-width: 768px) {
      width: 30px; 
      height: 30px;
      font-size: 16px;
  }
`;