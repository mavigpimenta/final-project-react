import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageEnveloper from "../../components/PageEnveloper";
import QuestionCard from "../../components/QuestionCard";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ModalNewPost } from "../../components/ModalNewPost";
import { ModalEditComment } from "../../components/ModalEditComment";
import { PageWrapper } from "./styled.module";

interface Post {
    _id: string;
    title: string;
    description: string;
    comments: { description: string, userId: { name: string, _id: string }, _id: string }[];
    userId: { name: string; _id: string };
    createdAt: string;
}

const PostDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | undefined>(undefined);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalCommentOpen, setIsModalCommentOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionComment, setDescriptionComment] = useState("");
    const [commentIdToEdit, setCommentIdToEdit] = useState<string | null>(null);
    const [commentDescriptionToEdit, setCommentDescriptionToEdit] = useState("");

    const getPost = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/post/getById/${id}`);
            setPost(response.data);
        } catch (error) {
            console.error("Erro ao carregar o post:", error);
            toast.error('Erro ao carregar o post.');
        }
    };

    useEffect(() => {
        getPost();
    }, [id]);

    if (!post) {
        return <div>Carregando...</div>;
    }

    const openModal = () => {
        setIsModalOpen(true);
        setTitle(post.title);
        setDescription(post.description);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openEditCommentModal = (commentId: string, currentDescription: string) => {
        setCommentIdToEdit(commentId);
        setCommentDescriptionToEdit(currentDescription);
        setIsModalCommentOpen(true);
    };

    const closeEditCommentModal = () => {
        setIsModalCommentOpen(false);
    };

    const deletePost = async () => {
        try {
            await axios.delete(`http://localhost:8000/post/delete/${id}`, {
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
            toast.success("Post editado com sucesso!");
            getPost();
            closeModal();
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

    const handleSubmitEditComment = async () => {
        try {
            await axios.patch(`http://localhost:8000/comment/edit/${commentIdToEdit}`, {
                description: commentDescriptionToEdit
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            toast.success("Comentário editado com sucesso!");
            closeEditCommentModal();
        } catch (error) {
            console.error("Erro ao editar o comentário:", error);
            toast.error("Erro ao editar o comentário.");
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            await axios.delete(`http://localhost:8000/comment/delete/${commentId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            toast.success("Comentário deletado com sucesso.");
            getPost();
        } catch (error) {
            console.error("Erro ao deletar o comentário:", error);
            toast.error("Erro ao deletar o comentário.");
        }
    };

    return (
        <>
            <PageEnveloper>
                <PageWrapper>
                    <QuestionCard userId={post.userId?._id} isDetails={true} onEdit={openModal} id={post._id} key={post._id} userIdPost={post.userId.name} title={post.title} onDelete={deletePost} handleSubmitNewComment={handleSubmitNewComment} setDescriptionComment={setDescriptionComment} descriptionComment={descriptionComment} createdAt={post.createdAt} openEditCommentModal={openEditCommentModal} handleDeleteComment={handleDeleteComment} comments={post.comments.map(comment => ({
                        description: comment.description,
                        userName: comment.userId?.name || 'Anônimo',
                        userId: comment.userId?._id,
                        _id: comment._id
                    }))} >
                        {post.description}
                    </QuestionCard>
                </PageWrapper>
            </PageEnveloper>
            <ModalNewPost onSubmit={handleSubmitEditPost} title={title} setTitle={setTitle} description={description} setDescription={setDescription} isopen={isModalOpen} onClose={closeModal} />
            <ModalEditComment onSubmit={handleSubmitEditComment} description={commentDescriptionToEdit} setDescription={setCommentDescriptionToEdit} isopen={isModalCommentOpen} onClose={closeEditCommentModal} />
        </>
    );
};

export default PostDetailPage;
