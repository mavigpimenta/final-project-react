import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PageEnveloper from "../../components/PageEnveloper";
import QuestionCard from "../../components/QuestionCard";
import { AddButton, PageWrapper } from "./styled.module";
import { ModalNewPost } from "../../components/ModalNewPost";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";

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
    const [titleSearch, setTitleSearch] = useState('');
    const [description, setDescription] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const getAllPosts = async (searchTitle: string = '') => {
        try {
            const response = await axios.get(`http://localhost:8000/post/getTitle?title=${searchTitle}&page=${currentPage}`);
            setPosts(response.data.posts);
            setTotalPages(response.data.totalPages);
            console.log(response.data);
        } catch (error) {
            console.log(error);
            toast.error('Erro ao carregar...');
        }
    };
    
    useEffect(() => {
        getAllPosts(titleSearch);
    }, [currentPage, titleSearch]);

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
                <Search title={titleSearch} setTitle={setTitleSearch} />
                {posts && posts.map((post) => (
                    post && post.title ? (
                        <QuestionCard isDetails={false} id={post._id} key={post._id} title={post.title} comments={post.comments.map(comment => ({
                            description: comment.description,
                            userName: comment.userId?.name || 'Anônimo'
                        }))}>
                            {truncateDescription(post.description)}
                        </QuestionCard>
                    ) : null
                ))}
                <AddButton onClick={openModal} />
                <ModalNewPost onSubmit={handleSubmitNewPost} title={title} setTitle={setTitle} description={description} setDescription={setDescription} isOpen={isModalOpen} onClose={closeModal} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </PageWrapper>
        </PageEnveloper>
    );
};

export default MainPage;
