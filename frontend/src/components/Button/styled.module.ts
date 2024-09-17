import styled from "styled-components";

export const StyledButton = styled.button`
    width: 400px;
    padding: 10px;
    background-color: #007BC0;
    color: white;
    border: none;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        background-color: #005a87;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`