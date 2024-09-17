import styled from "styled-components";

export const Background = styled.div`
    width: 100%;
    height: 12vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &::after {
        content: "";
        background-image: url("/boschcolor.svg");
        background-repeat: no-repeat;
        background-size: 100%;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 8px;
    }
`

export const Image = styled.img`
    width: 200px;
    height: 50px;
    padding-left: 25px;
`