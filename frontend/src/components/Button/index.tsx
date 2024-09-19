import { StyledButton } from "./styled.module";

interface ButtonProps {
    children: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
    return (
        <StyledButton onClick={onClick}>{children}</StyledButton>
    );
}

export default Button;