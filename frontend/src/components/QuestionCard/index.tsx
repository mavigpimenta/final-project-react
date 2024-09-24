import { useEffect, useState } from "react";
import { CardWrapper, Comment, CommentWrapper, Description, Header, InputContainer, Line, SeeMoreButton, SeeMorePosition, StyledIcon, Title, UserIcon } from "./styled.module";
import { useLanguage } from "../../context/LanguageContext";
import Delete from "/Delete.svg";
import Edit from "/Edit.svg";
import CommentInput from "../CommentInput";

interface CommentProps {
    description: string;
    userName: string;
}

const QuestionCard = ({ title, children, comments, id }: { title: string, children: string, comments: CommentProps[], id: string}) => {
    const [userColors, setUserColors] = useState<{ [key: string]: string }>({});
    const { selectedLanguage, setLanguage } = useLanguage();
    const [bgColor, setBgColor] = useState("#ccc");
    const [userInitial, setUserInitial] = useState("U");
    const [userName, setUserName] = useState("Usuário");
    const [descriptionComment, setDescriptionComment] = useState("");

    const handleSubmitNewComment = () => {
        console.log("oba");
    }

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
        const storedBgColor = localStorage.getItem(`${storedUserName}-color`);

        setUserName(formatUserName(storedUserName));
        setUserInitial(storedUserName.charAt(0).toUpperCase());

        if (storedBgColor) {
            setBgColor(storedBgColor);
        } else {
            const newColor = getRandomColor();
            localStorage.setItem(`${storedUserName}-color`, newColor);
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
        return description.length > 64 
            ? description.slice(0, 64) + "..." 
            : description;
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
        const firstName = namesArray[0];
        const lastName = namesArray[namesArray.length - 1];
        return `${firstName} ${lastName}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    return (
        <CardWrapper>
            <Header>
                <StyledIcon src={Delete} />
                <StyledIcon src={Edit} />
            </Header>
            <Title>{title}</Title>
            <Description>{children}</Description>
            <Line />
            {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                    <CommentWrapper>
                    <Comment key={index}>
                        <UserIcon bgColor={userColors[comment.userName] || "#ccc"}>{comment.userName.charAt(0).toUpperCase()}</UserIcon>
                        {truncateDescription(comment.description)}
                    </Comment>
                    </CommentWrapper>
                ))
            ) : (
                <Comment>
                    <UserIcon bgColor='#ccc'>S</UserIcon>
                    {selectedLanguage === 'pt-BR' ? 'Não há comentários ainda.' : 'No comments yet.'}
                </Comment>
            )}
            <InputContainer>
                <UserIcon bgColor={bgColor}>{userInitial}</UserIcon>
                <CommentInput onSubmit={handleSubmitNewComment} description={descriptionComment} setDescription={setDescriptionComment} />
            </InputContainer>

            <SeeMorePosition>
                <SeeMoreButton href={`/detail/${id}`}>{selectedLanguage === 'pt-BR' ? 'Ver mais' : 'See more'}</SeeMoreButton>
            </SeeMorePosition>
        </CardWrapper>
    )
}

export default QuestionCard;