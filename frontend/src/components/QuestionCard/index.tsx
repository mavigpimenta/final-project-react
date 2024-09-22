    import { useEffect, useState } from "react";
    import { CardWrapper, Comment, CommentWrapper, Description, Line, SeeMoreButton, SeeMorePosition, Title, UserIcon } from "./styled.module";

    interface CommentProps {
        description: string;
        userName: string;
    }

    const QuestionCard = ({ title, children, comments }: { title: string, children: string, comments: CommentProps[]}) => {
        const [bgColor, setBgColor] = useState("#ccc");
        const [userInitial, setUserInitial] = useState("U");
        const [userColors, setUserColors] = useState<{ [key: string]: string }>({});

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

        return (
            <CardWrapper>
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
                        <UserIcon bgColor={bgColor}>S</UserIcon>
                        Não há comentários ainda.
                    </Comment>
                )}
                <SeeMorePosition>
                    <SeeMoreButton href="/home">Ver mais</SeeMoreButton>
                </SeeMorePosition>
            </CardWrapper>
        )
    }

    export default QuestionCard;