import { Input } from "../Input";
import { CloseButton, ModalContent, ModalOverlay, PostForm } from "./styled.module";
import { Textarea } from "../Textarea";
import Button from "../Button";
import { useLanguage } from "../../context/LanguageContext";

interface ModalFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    description: string;
    setDescription: (value: string) => void;
    isopen: boolean;
    onClose: () => void;
  }

export const ModalEditComment: React.FC<ModalFormProps> = ({onSubmit, description, setDescription, isopen, onClose }) => {
    if (!isopen) return null;
    const { selectedLanguage, setLanguage } = useLanguage();
      
    return (
        <ModalOverlay>
            <ModalContent>
              <CloseButton onClick={onClose}>✖</CloseButton>
              <PostForm onSubmit={onSubmit}>
                <Textarea label={selectedLanguage === 'pt-BR' ? 'Descrição' : selectedLanguage === 'en-US' ? 'Description' : 'Beschreibung'} rows="4" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <Button>{selectedLanguage === 'pt-BR' ? 'Publicar' : selectedLanguage === 'en-US' ? 'Publish' : 'Veröffentlichen'}</Button>
              </PostForm>
            </ModalContent>
        </ModalOverlay>
    );
};