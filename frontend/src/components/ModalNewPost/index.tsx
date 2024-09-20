import { useState } from "react";
import { Input } from "../Input";
import { CloseButton, ModalContent, ModalOverlay, PostForm } from "./styled.module";
import { Textarea } from "../Textarea";
import Button from "../Button";

interface ModalFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    title: string;
    setTitle: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    isOpen: boolean;
    onClose: () => void;
  }

export const ModalNewPost: React.FC<ModalFormProps> = ({onSubmit, title, description, setTitle, setDescription, isOpen, onClose }) => {
    if (!isOpen) return null;
      
    return (
        <ModalOverlay>
            <ModalContent>
              <CloseButton onClick={onClose}>✖</CloseButton>
              <PostForm onSubmit={onSubmit}>
                <Input label="Título" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <Textarea label="Descrição" rows="4" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <Button>Publicar</Button>
              </PostForm>
            </ModalContent>
        </ModalOverlay>
    );
};

