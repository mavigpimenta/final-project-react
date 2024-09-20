import { CardWrapper, Description, SeeMoreButton, Title } from "./styled.module";

const QuestionCard = () => {
    return (
        <CardWrapper>
            <Title>TITLE</Title>
            <Description>DESCRIPTION</Description>
            <SeeMoreButton href="/home">Ver mais</SeeMoreButton>
        </CardWrapper>
    )
}

export default QuestionCard;