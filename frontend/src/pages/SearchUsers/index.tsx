import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PageEnveloper from "../../components/PageEnveloper";
import { CardWrapper, Title, Description, UserIcon } from "../../components/QuestionCard/styled.module";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import { PageWrapper } from "./styled.module";

interface User {
    _id: string;
    name: string;
    edv: string;
    role: string;
    birthDate: string;
    iconColor: string;
}

export const SearchUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/user/getUsers?page=${currentPage}&name=${searchTerm}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            setUsers(response.data.users);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            toast.error("Error fetching users");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [currentPage, searchTerm]);

    const generateColorForUser = (userName: string): string => {
        const hash = [...userName].reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const color = `hsl(${hash % 360}, 70%, 60%)`; 
        return color;
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    };

    const getRoleLabel = (role: string): string => {
        const roleMap: { [key: string]: string } = {
            ADMIN: "Administrador",
            INSTRUCTOR: "Instrutor",
            STUDENT: "Aluno"
        };
        return roleMap[role] || role; 
    };

    return (
        <PageEnveloper>
            <PageWrapper>
                <Search title={searchTerm} setTitle={setSearchTerm} />
                {users.map((user) => (
                    <CardWrapper key={user._id}>
                        <UserIcon bgColor={generateColorForUser(user.name)}>{user.name[0].toUpperCase()}</UserIcon>
                        <Title>{user.name}</Title>
                        <Description><b>EDV:</b> {user.edv}</Description>
                        <Description><b>Data de Nascimento: </b>{formatDate(user.birthDate)}</Description>
                        <Description><b>Cargo: </b>{getRoleLabel(user.role)}</Description>
                    </CardWrapper>
                ))}
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </PageWrapper>
        </PageEnveloper>
    );
};
