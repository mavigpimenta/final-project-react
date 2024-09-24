import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageEnveloper from "../../components/PageEnveloper"
import QuestionCard from "../../components/QuestionCard";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Post {
    _id: string;
    title: string;
    description: string;
    comments: { description: string, userId: { name: string } }[];
}

const PostDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | undefined>(undefined);

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

    return (
        <PageEnveloper>
            <QuestionCard isDetails={true} id={post._id} key={post._id} title={post.title} comments={post.comments.map(comment => ({
                description: comment.description,
                userName: comment.userId?.name || 'Anônimo'
            }))}>
                {(post.description)}
            </QuestionCard>
        </PageEnveloper>
    )
}

export default PostDetailPage;