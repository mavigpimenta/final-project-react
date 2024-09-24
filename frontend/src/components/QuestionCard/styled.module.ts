import styled from "styled-components";

interface UserIconProps {
    bgColor: string;
}

export const CardWrapper = styled.div`
    width: 80%; 
    max-width: 600px; 
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 25px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 10px; 
    margin: 0 auto;
    overflow: hidden;

    @media (max-width: 768px) {
        padding: 15px; 
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: end;
    gap: 10px;
`;

export const Title = styled.div`
    font-size: 2rem;
    font-weight: bold;
`;

export const StyledIcon = styled.img`
    width: 25px;
    height: 25px;
    cursor: pointer;
`;

export const StyledIconComment = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

export const Description = styled.p`
    text-align: justify;
    font-size: 1rem;
`;

export const CommentWrapper = styled.div`
    display: flex;
    align-items: flex-start; 
`;

export const Comment = styled.p`
    display: flex;
    align-items: center;
    text-align: justify;
    gap: 10px;
    font-size: 0.9rem; 
    overflow-wrap: break-word; 
    word-wrap: break-word; 
    hyphens: auto;
    flex: 1;
    margin: 0;
    line-height: 1.2;
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
    width: auto; 
    display: flex;
    justify-content: center;
    font-size: 0.9rem; 
    font-weight: bold;
    color: #007BC0;

    &:hover {
        color: #005A87;
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
    flex-shrink: 0;

    @media (max-width: 768px) {
        width: 30px; 
        height: 30px;
        font-size: 16px;
    }
`;

export const InputContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 5px;
`;

export const CreationDetail = styled.p`
    display: flex;
    align-items: center;
    gap: 5px;
    text-align: justify;
    font-size: 0.8rem;

    @media (max-width: 375px) {
        font-size: 0.4rem;
    }

    @media (min-width: 425px) {
        font-size: 0.6rem;
    }

    @media (min-width: 768px) {
        font-size: 0.8rem;
    }
`;

export const UserDetail = styled.div<UserIconProps>`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: ${(props) => props.bgColor || "#ccc"};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #fff;
    flex-shrink: 0;
    font-size: 12px;

    @media (max-width: 768px) {
        width: 20px; 
        height: 20px;
        font-size: 10px;
    }
`;