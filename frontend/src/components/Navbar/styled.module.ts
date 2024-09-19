import styled from "styled-components";

export const NavbarContainer = styled.div`
    width: 100vw;
    height: 12vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &::after {
        content: "";
        background-image: url("/ColorBar.svg");
        background-repeat: no-repeat;
        background-size: 100%;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 8px;
    }
`

export const NavbarContent = styled.div`
    width: 100vw;
    display: flex;
    justify-content: space-between
`

export const Image = styled.img`
    width: 200px;
    height: 50px;
    padding-left: 25px;
`

export const DarkModeButton = styled.button`
    background-color: #FFFFFF;
    border-style: none;
    display: flex;
    cursor: pointer;
`

export const DarkModeImage = styled.img`
    width: 35px;
    height: 35px;
    padding-right: 25px;
`