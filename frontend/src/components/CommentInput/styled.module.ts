import styled from "styled-components";

export const FormContainer = styled.form`
    display: flex;
    width: 100%;
`;

export const StyledButton = styled.button`
    width: 40px;
    height: 40px;
    border-style: none;
    border-radius: 100%;
    background-color: #007BC0;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    cursor: pointer;

    background-image: url("/Paperplane.svg");
    background-repeat: no-repeat;
    background-position: center;

    &:hover {
        background-color: #005A87;
    }
`;