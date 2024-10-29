import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 88vh;
    align-items: center;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-grow: 1;
`;

export const ErrorMessage = styled.h1`
    font-size: 1.8rem;
    color: #333;
`;

export const SubMessage = styled.p`
    font-size: 1.2rem;
    color: #666;
    margin-top: 0.5rem;
    margin-bottom: 2rem;
`;

export const LoginButton = styled.button`
    padding: 0.8rem 2rem;
    font-size: 1rem;
    color: #fff;
    background-color: #1976d2;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #1565c0;
    }
`;