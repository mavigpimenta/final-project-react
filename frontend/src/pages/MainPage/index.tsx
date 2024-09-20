import { useState } from "react";
import PageEnveloper from "../../components/PageEnveloper"
import QuestionCard from "../../components/QuestionCard";
import { AddButton, PageWrapper } from "./styled.module";
import { ModalNewPost } from "../../components/ModalNewPost";

const MainPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <PageEnveloper>
            <PageWrapper>
                <QuestionCard title="Title">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id magna sed lacus condimentum mattis et id sem. Nulla facilisi. Aliquam ultrices faucibus vulputate. Sed vehicula tincidunt pretium. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam laoreet tincidunt tellus, id vestibulum magna lacinia vel. Duis a porta nisl. Curabitur pulvinar, arcu ut iaculis finibus, sem metus tincidunt metus, ut tincidunt leo turpis vitae elit.
                </QuestionCard>
                <QuestionCard title="Title">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id magna sed lacus condimentum mattis et id sem. Nulla facilisi. Aliquam ultrices faucibus vulputate. Sed vehicula tincidunt pretium. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam laoreet tincidunt tellus, id vestibulum magna lacinia vel. Duis a porta nisl. Curabitur pulvinar, arcu ut iaculis finibus, sem metus tincidunt metus, ut tincidunt leo turpis vitae elit.
                </QuestionCard>
                <QuestionCard title="Title">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id magna sed lacus condimentum mattis et id sem. Nulla facilisi. Aliquam ultrices faucibus vulputate. Sed vehicula tincidunt pretium. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam laoreet tincidunt tellus, id vestibulum magna lacinia vel. Duis a porta nisl. Curabitur pulvinar, arcu ut iaculis finibus, sem metus tincidunt metus, ut tincidunt leo turpis vitae elit.
                </QuestionCard>
                <AddButton onClick={openModal}/>
                <ModalNewPost isOpen={isModalOpen} onClose={closeModal} />
            </PageWrapper>
        </PageEnveloper>
    )
}

export default MainPage;