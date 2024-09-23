import styled from "styled-components";

export const SearchContainer = styled.div`
    min-width: 25%;
    height: 30px;
    padding: 10px;
    gap: 10px;
    display: flex;
    align-items: center;
    border: 1px solid;
    border-radius: 10px;
`

export const StyledSearch = styled.input`
    width: 100%;
    height: 100%;
    font-size: 17px;
    border-style: none;
    outline: none;
    background-color: transparent;
    color: var(--bg-text);
`

export const SearchImage = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
`