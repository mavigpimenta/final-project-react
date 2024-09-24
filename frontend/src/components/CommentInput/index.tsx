import { Input } from "../Input";
import { FormContainer, StyledButton } from "./styled.module";

interface CommentFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    description: string;
    setDescription: (value: string) => void;
}

const CommentInput: React.FC<CommentFormProps> = ({ onSubmit, description, setDescription }) => {
    return (
        <FormContainer onSubmit={onSubmit}>
            <Input type="text" value={description} placeholder="Escreva seu comentário" onChange={(e) => setDescription(e.target.value)} />
            <StyledButton />
        </FormContainer>
    )
}

export default CommentInput;