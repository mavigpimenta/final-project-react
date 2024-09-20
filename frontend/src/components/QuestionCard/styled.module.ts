import styled from "styled-components";

export const CardWrapper = styled.div`
    width: 35%;
    height: 300px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;

    background-color: bisque;
`;

export const Title = styled.p`
    font-size: 28px;
    font-weight: bold;
`;

export const Description = styled.div`
    
`;

export const Comment = styled.div`

`;

export const SeeMoreButton = styled.a`
    display: flex;
    justify-content: end;
    font-size: 13px;
    font-weight: bold;
    color: #007BC0;

    &:hover {
        color: #005a87;
    }
`;