import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PageEnveloper from "../../components/PageEnveloper";
import { CardWrapper, Title, Description, UserIcon } from "../../components/QuestionCard/styled.module";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import { Header, IconWrapper, PageWrapper, StyledIcon } from "./styled.module";
import { useLanguage } from "../../context/LanguageContext";
import Delete from "/Delete.svg";
import Edit from "/Edit.svg";
import { jwtDecode } from "jwt-decode";
import { ModalEditUser } from "../../components/ModalEditUser";
import { useNavigate } from "react-router-dom";

interface User {
    _id: string;
    name: string;
    edv: string;
    role: string;
    birthDate: string;
    iconColor: string;
}

interface TokenData {
    id: string;
    role: string;
}

export const SearchUsers: React.FC = ({ onDelete, onEdit }: { onDelete?: () => void, onEdit?: () => void }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const { selectedLanguage, setLanguage } = useLanguage();
    const role = localStorage.getItem("role");
    const [tokenData, setTokenData] = useState<TokenData | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode<TokenData>(token);
            setTokenData(decodedToken);
        }
    }, []);

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

    const getRoleLabel = (role: string, selectedLanguage: string): string => {
        const roleMap: { [key: string]: { [key: string]: string } } = {
            ADMIN: {
                'pt-BR': "Administrador",
                'en-US': "Administrator",
                'de-DE': "Administrator"
            },
            INSTRUCTOR: {
                'pt-BR': "Instrutor",
                'en-US': "Instructor",
                'de-DE': "Ausbilder"
            },
            STUDENT: {
                'pt-BR': "Aluno",
                'en-US': "Student",
                'de-DE': "Student"
            }
        };

        return roleMap[role]?.[selectedLanguage] || role;
    };

    const handleDelete = async (userId: string) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`http://localhost:8000/user/delete/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });

                toast.success("User deleted successfully!");
                fetchUsers();
            } catch (error) {
                toast.error("Error deleting user");
            }
        }
    };


    return (
        <>
            <PageEnveloper>
                <PageWrapper>
                    <Search title={searchTerm} setTitle={setSearchTerm} />
                    {users.map((user) => (
                        <CardWrapper key={user._id}>
                            <Header>
                                <UserIcon bgColor={generateColorForUser(user.name)}>{user.name[0].toUpperCase()}</UserIcon>
                                <IconWrapper>
                                    <StyledIcon src={Delete} onClick={() => handleDelete(user._id)} />
                                </IconWrapper>
                            </Header>
                            <Title>{user.name}</Title>
                            <Description><b>EDV:</b> {user.edv}</Description>
                            <Description><b>{selectedLanguage === 'pt-BR' ? 'Data de Nascimento: ' : selectedLanguage === 'en-US' ? 'Birth Date: ' : 'Geburtsdatum: '}</b>{formatDate(user.birthDate)}</Description>
                            <Description><b>{selectedLanguage === 'pt-BR' ? 'Cargo: ' : selectedLanguage == 'en-US' ? 'Role: ' : 'Position: '}</b>{getRoleLabel(role, selectedLanguage)}</Description>
                        </CardWrapper>
                    ))}
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </PageWrapper>
            </PageEnveloper>
        </>
    );
};
