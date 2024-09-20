import PageEnveloper from "../../components/PageEnveloper"
import QuestionCard from "../../components/QuestionCard";
import { PageWrapper } from "./styled.module";

const MainPage = () => {
    return (
        <PageEnveloper>
            <PageWrapper>
                <QuestionCard>
                </QuestionCard>
                <QuestionCard>
                </QuestionCard>
                <QuestionCard>
                </QuestionCard>
                <QuestionCard>
                </QuestionCard>
                <QuestionCard>
                </QuestionCard>
            </PageWrapper>
        </PageEnveloper>
    )
}

export default MainPage;