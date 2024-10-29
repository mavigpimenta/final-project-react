import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PageEnveloper from "../../components/PageEnveloper";
import QuestionCard from "../../components/QuestionCard";
import { AddButton, PageWrapper, PostCreator, PostCreatorIcon } from "./styled.module";
import { ModalNewPost } from "../../components/ModalNewPost";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";

interface Post {
    _id: string;
    title: string;
    description: string;
    comments: { description: string, userId: { name: string } }[];
    userId: { name: string, _id: string }
}

const MainPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState('');
    const [titleSearch, setTitleSearch] = useState('');
    const [description, setDescription] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [userColors, setUserColors] = useState<{ [key: string]: string }>({});

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        posts.forEach((post) => {
            const storedColor = localStorage.getItem(post.comments[0]?.userId?.name);
            if (!storedColor) {
                const newColor = generateColorForUser(post.comments[0]?.userId?.name);
                localStorage.setItem(post.comments[0]?.userId?.name, newColor);
                setUserColors((prevColors) => ({
                    ...prevColors,
                    [post.comments[0]?.userId?.name]: newColor
                }));
            } else {
                setUserColors((prevColors) => ({
                    ...prevColors,
                    [post.comments[0]?.userId?.name]: storedColor
                }));
            }
        });
    }, [posts]);

    const generateColorForUser = (userName: string) => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

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
                closeModal();
                setTitle('');
                setDescription('');
            }
            getAllPosts();
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
                        <PostCreator key={post._id}>
                            <PostCreatorIcon bgColor={localStorage.getItem(post.userId.name) || "#ccc"}>{post.userId?.name.charAt(0).toUpperCase()}</PostCreatorIcon>
                            <QuestionCard
                                isDetails={false}
                                id={post._id}
                                title={post.title}
                                comments={post.comments.map(comment => ({
                                    description: comment.description,
                                    userName: comment.userId?.name || 'Anônimo'
                                }))}
                                handleSubmitNewComment={() => {}}
                                setDescriptionComment={() => {}}
                                userId={post.userId?._id || ''}
                                createdAt={''}
                                userIdPost={post.userId?._id || ''}
                            >
                                {truncateDescription(post.description)}
                            </QuestionCard>
                        </PostCreator>
                    ) : null
                ))}
                <AddButton onClick={openModal} />
                <ModalNewPost onSubmit={handleSubmitNewPost} title={title} setTitle={setTitle} description={description} setDescription={setDescription} isopen={isModalOpen} onClose={closeModal} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </PageWrapper>
        </PageEnveloper>
    );
};

export default MainPage;
