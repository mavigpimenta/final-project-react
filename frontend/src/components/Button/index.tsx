import { StyledButton } from "./styled.module";

const Button = ({ children }: { children: string }) => {
    return (
        <StyledButton>{children}</StyledButton>
    )
}

export default Button;