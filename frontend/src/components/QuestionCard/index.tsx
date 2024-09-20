import { useEffect, useState } from "react";
import { CardWrapper, Comment, Description, Line, SeeMoreButton, SeeMorePosition, Title, UserIcon } from "./styled.module";

const QuestionCard = ({ title, children }: { title: string, children: string }) => {
    const [bgColor, setBgColor] = useState("#ccc");
    const [userInitial, setUserInitial] = useState("U");

    useEffect(() => {
        setBgColor(getRandomColor());
        const storedUserName = localStorage.getItem('name') || "Usuário";
        setUserInitial(storedUserName.charAt(0).toUpperCase());
    }, []);

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return (
        <CardWrapper>
            <Title>{title}</Title>
            <Description>{children}</Description>
            <Line />
            <Comment><UserIcon bgColor={bgColor}>{userInitial}</UserIcon>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</Comment>
            <Comment><UserIcon bgColor={bgColor}>{userInitial}</UserIcon>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</Comment>
            <SeeMorePosition>
                <SeeMoreButton href="/home">Ver mais</SeeMoreButton>
            </SeeMorePosition>
        </CardWrapper>
    )
}

export default QuestionCard;