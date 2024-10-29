import { ReactElement, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

interface IProtectedRoute {
    errorPage: ReactElement;
    targetPage: ReactElement;
}

export default function ProtectedRoute({ errorPage, targetPage }: IProtectedRoute) {
    const [page, setPage] = useState(<></>);

    function renderPage() {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("Token não encontrado.");
            setPage(errorPage);
            return;
        }

        try {
            const decodedToken: { exp: number } = jwtDecode(token);
            const tokenExpirationTime = decodedToken.exp * 1000;

            console.log("Token expira em:", new Date(tokenExpirationTime));
            console.log("Horário atual:", new Date());

            if (tokenExpirationTime <= Date.now()) {
                console.log("Token expirado.");
                setPage(errorPage);
                return;
            }

            console.log("Token válido. Carregando página de destino.");
            setPage(targetPage);
        } catch (error) {
            console.log("Erro ao decodificar o token:", error);
            setPage(errorPage);
        }
    }

    useEffect(() => {
        renderPage();
    }, []);

    return page;
}
