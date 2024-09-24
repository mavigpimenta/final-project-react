import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageEnveloper from "../../components/PageEnveloper"
import QuestionCard from "../../components/QuestionCard";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ModalNewPost } from "../../components/ModalNewPost";

interface Post {
    _id: string;
    title: string;
    description: string;
    comments: { description: string, userId: { name: string } }[];
}

const PostDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | undefined>(undefined);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionComment, setDescriptionComment] = useState("");
    
    const getPost = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/post/getById/${id}`);
            setPost(response.data);
        } catch (error) {
            console.error("Erro ao carregar o post:", error);
            toast.error('Erro ao carregar o post.');
        }
    };
    
    const openModal = () => {
        setIsModalOpen(true);
        setTitle(post.title);
        setDescription(post.description)
    }

    const deletePost = async () => {
        try {
            await axios.delete(`http://localhost:8000/post/delete/${id}`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            toast.success("Post deletado com sucesso.");
            navigate("/home");
        } catch (error) {
            console.error("Erro ao deletar o post:", error);
            toast.error('Erro ao deletar o post.');
        }
    };

    const handleSubmitEditPost = async () => {
        try {
            await axios.patch(`http://localhost:8000/post/edit/${id}`, {
                title,
                description
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            setIsModalOpen(false); 
            getPost(); 
            toast.success("Post atualizado com sucesso.");
        } catch (error) {
            console.error("Erro ao atualizar o post:", error);
            toast.error('Erro ao atualizar o post.');
        }
    };

    const handleSubmitNewComment = async () => {
        if (!descriptionComment) {
            toast.error("O comentário não pode estar vazio.");
            return;
        }

        try {
            await axios.post(`http://localhost:8000/comment/create`, {
                postId: id,
                description: descriptionComment,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });

            setDescriptionComment(""); 
            getPost(); 
            toast.success("Comentário adicionado com sucesso.");
        } catch (error) {
            console.error("Erro ao adicionar o comentário:", error);
            toast.error('Erro ao adicionar o comentário.');
        }
    };
    
    useEffect(() => {
        getPost();
    }, [id]);

    if (!post) {
        return <div>Carregando...</div>; 
    }

    return (
        <>
            <PageEnveloper>
                <QuestionCard isDetails={true} onEdit={openModal} id={post._id} key={post._id} title={post.title} onDelete={deletePost} handleSubmitNewComment={handleSubmitNewComment} setDescriptionComment={setDescriptionComment} descriptionComment={descriptionComment} comments={post.comments.map(comment => ({
                    description: comment.description,
                    userName: comment.userId?.name || 'Anônimo'
                }))}>
                    {(post.description)}
                </QuestionCard>
            </PageEnveloper>
            <ModalNewPost onSubmit={handleSubmitEditPost} title={title} setTitle={setTitle} description={description} setDescription={setDescription} isOpen={isModalOpen} onClose={closeModal} />
        </>
    )
}

export default PostDetailPage;