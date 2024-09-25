import { useEffect, useState } from "react";
import { CardWrapper, Comment, CommentWrapper, CreationDetail, Description, Header, InputContainer, Line, SeeMoreButton, SeeMorePosition, StyledIcon, StyledIconComment, Title, UserDetail, UserIcon } from "./styled.module";
import { useLanguage } from "../../context/LanguageContext";
import Delete from "/Delete.svg";
import Edit from "/Edit.svg";
import CommentInput from "../CommentInput";
import { jwtDecode } from "jwt-decode";

interface CommentProps {
    description: string;
    userName: string;
    userId: string;
    _id: string;
}

interface TokenData {
    id: string;
    role: string;
}

const QuestionCard = ({
    title, children, comments, id, userId, onDelete, onEdit, handleSubmitNewComment, descriptionComment, setDescriptionComment, isDetails, createdAt, openEditCommentModal, handleDeleteComment, }: { isDetails: boolean; title: string; children: string; comments: CommentProps[]; id: string; onDelete?: () => void; onEdit?: () => void; handleSubmitNewComment?: () => void; setDescriptionComment?: (value: string) => void; userId: string; descriptionComment?: string; createdAt: string; openEditCommentModal?: (commentId: string, currentDescription: string) => void; handleDeleteComment?: (commentId: string) => void; }) => {
    const [userColors, setUserColors] = useState<{ [key: string]: string }>({});
    const { selectedLanguage } = useLanguage();
    const [bgColor, setBgColor] = useState("#ccc");
    const [userInitial, setUserInitial] = useState("U");
    const [userName, setUserName] = useState("Usuário");

    const [tokenData, setTokenData] = useState<TokenData | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode<TokenData>(token);
            setTokenData(decodedToken);
        }
    }, []);

    useEffect(() => {
        comments.forEach((comment) => {
            const storedColor = localStorage.getItem(comment.userName);
            if (!storedColor) {
                const newColor = generateColorForUser(comment.userName);
                localStorage.setItem(comment.userName, newColor);
                setUserColors((prevColors) => ({
                    ...prevColors,
                    [comment.userName]: newColor
                }));
            } else {
                setUserColors((prevColors) => ({
                    ...prevColors,
                    [comment.userName]: storedColor
                }));
            }
        });
    }, [comments]);

    useEffect(() => {
        const storedUserName = localStorage.getItem('name') || "Usuário";
        const storedBgColor = localStorage.getItem(`${storedUserName}`);

        setUserName(formatUserName(storedUserName));
        setUserInitial(storedUserName.charAt(0).toUpperCase());

        if (storedBgColor) {
            setBgColor(storedBgColor);
        } else {
            const newColor = getRandomColor();
            localStorage.setItem(`${storedUserName}`, newColor);
            setBgColor(newColor);
        }
    }, []);

    const generateColorForUser = (userName: string) => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const truncateDescription = (description: string) => {
        return description.length > 64 ? description.slice(0, 64) + "..." : description;
    };

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const formatUserName = (name: string) => {
        const namesArray = name.split(" ");
        const capitalizedNames = namesArray.map(part => {
            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        });
        return capitalizedNames.join(" ").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const canEditOrDeleteComment = (commentUserId: string) => {
        return tokenData?.role === "ADMIN" || tokenData?.id === commentUserId;
    };

    const canEditOrDeletePost = (postUserId: string) => {
        return tokenData?.role === "ADMIN" || tokenData?.id === postUserId;
    };

    return (
        <CardWrapper>
            {isDetails && canEditOrDeletePost(userId) && (
                <Header>
                    <StyledIcon src={Delete} onClick={onDelete} />
                    <StyledIcon src={Edit} onClick={onEdit} />
                </Header>
            )}
            <Title>{title}</Title>
            <Description>{children}</Description>
            {isDetails && (
                <CreationDetail>
                    {selectedLanguage === 'pt-BR' ? 'Criado por' : selectedLanguage === 'en-US' ? 'Created by' : 'Erstellt von'} 
                    <UserDetail bgColor={bgColor}>{userInitial}</UserDetail> {formatUserName(userName)} 
                    {selectedLanguage === 'pt-BR' ? ' em' : selectedLanguage === 'en-US' ? ' at' : ' am'} {formatDate(createdAt)}
                </CreationDetail>
            )}
            <Line />
            {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                    <CommentWrapper key={index}>
                        <Comment>
                            <UserIcon bgColor={userColors[comment.userName] || "#ccc"}>
                                {comment.userName.charAt(0).toUpperCase()}
                            </UserIcon>
                            {truncateDescription(comment.description)}
                        </Comment>
                        {isDetails && canEditOrDeleteComment(comment.userId) && (
                            <Header>
                                <StyledIconComment src={Delete} onClick={() => handleDeleteComment(comment._id)} />
                                <StyledIconComment src={Edit} onClick={() => openEditCommentModal(comment._id, comment.description)} />
                            </Header>
                        )}
                    </CommentWrapper>
                ))
            ) : (
                <Comment>
                    <UserIcon bgColor='#ccc'>S</UserIcon>
                    {selectedLanguage === 'pt-BR' ? 'Não há comentários ainda.' : selectedLanguage === 'en-US' ? 'No comments yet.' : 'Es liegen noch keine Kommentare vor.'}
                </Comment>
            )}

            {isDetails ? (
                <InputContainer>
                    <UserIcon bgColor={bgColor}>{userInitial}</UserIcon>
                    <CommentInput onSubmit={handleSubmitNewComment} description={descriptionComment} setDescription={setDescriptionComment} />
                </InputContainer>
            ) : (
                <SeeMorePosition>
                    <SeeMoreButton href={`/detail/${id}`}>
                        {selectedLanguage === 'pt-BR' ? 'Ver mais' : selectedLanguage === 'en-US' ? 'See more' : 'Mehr sehen'}
                    </SeeMoreButton>
                </SeeMorePosition>
            )}
        </CardWrapper>
    );
};

export default QuestionCard;
