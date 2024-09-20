import styled from "styled-components";

interface UserIconProps {
    bgColor: string;
}

export const CardWrapper = styled.div`
    width: 35%;
    height: 380px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 25px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export const Title = styled.p`
    font-size: 28px;
    font-weight: bold;
`;

export const Description = styled.p`
    text-align: justify;
`;

export const Comment = styled.p`
    display: flex;
    align-items: center;
    text-align: justify;
    gap: 10px;
`;

export const Line = styled.hr`
    border: 1px solid #ccc;
    border-radius: 15px;
`;

export const SeeMorePosition = styled.div`
    display: flex;
    justify-content: end;
`;

export const SeeMoreButton = styled.a`
    width: 10%;
    display: flex;
    justify-content: center;
    font-size: 13px;
    font-weight: bold;
    color: #007BC0;

    &:hover {
        color: #005a87;
    }
`;

export const UserIcon = styled.div<UserIconProps>`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor || "#ccc"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
`;