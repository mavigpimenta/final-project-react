import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PageEnveloper from "../../components/PageEnveloper";
import QuestionCard from "../../components/QuestionCard";
import { AddButton, PageWrapper } from "./styled.module";
import { ModalNewPost } from "../../components/ModalNewPost";
import Pagination from "../../components/Pagination";

interface Post {
    _id: string;
    title: string;
    description: string;
    comments: { description: string, userId: { name: string } }[];
}

const MainPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const getAllPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/post/getAll?page=${currentPage}`);
            setPosts(response.data.posts);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.log(error);
            toast.error('Erro ao carregar...');
        }
    };

    useEffect(() => {
        getAllPosts();
    }, [currentPage]);

    const handleSubmitNewPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || !description) {
            toast.error("Preencha todos os campos!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/post/create', {
                title,
                description
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });

            if (response.status === 201) {
                toast.success("Post criado com sucesso!");
                setPosts((prevPosts) => [...prevPosts, response.data.post]);
                closeModal();
                setTitle('');
                setDescription('');
            }
        } catch (error) {
            console.error("Erro ao criar o post:", error);
            toast.error("Erro ao criar o post!");
        }
    };

    const truncateDescription = (description: string) => {
        return description.length > 440
            ? description.slice(0, 440) + "..."
            : description;
    };

    return (
        <PageEnveloper>
            <PageWrapper>
                {posts && posts.map((post) => (
                    post && post.title ? (
                        <QuestionCard key={post._id} title={post.title} comments={post.comments.map(comment => ({
                            description: comment.description,
                            userName: comment.userId?.name || 'Anônimo'
                        }))}>
                            {truncateDescription(post.description)}
                        </QuestionCard>
                    ) : null
                ))}
                <AddButton onClick={openModal} />
                <ModalNewPost onSubmit={handleSubmitNewPost} title={title} setTitle={setTitle} description={description} setDescription={setDescription} isOpen={isModalOpen} onClose={closeModal} />
                <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={setCurrentPage} 
                />
            </PageWrapper>
        </PageEnveloper>
    );
};

export default MainPage;
