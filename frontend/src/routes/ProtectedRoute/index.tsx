import { ReactElement, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

interface IProtectedRoute {
    errorPage: ReactElement;
    targetPage: ReactElement;
}

export default function ProtectedRoute({ errorPage, targetPage }: IProtectedRoute) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("Token não encontrado.");
            setIsAuthorized(false);
            return;
        }

        try {
            const decodedToken: { exp: number } = jwtDecode(token);
            const tokenExpirationTime = decodedToken.exp * 1000;

            console.log("Token expira em:", new Date(tokenExpirationTime));
            console.log("Horário atual:", new Date());

            if (tokenExpirationTime <= Date.now()) {
                console.log("Token expirado.");
                setIsAuthorized(false);
                return;
            }

            console.log("Token válido. Carregando página de destino.");
            setIsAuthorized(true);
        } catch (error) {
            console.log("Erro ao decodificar o token:", error);
            setIsAuthorized(false);
        }
    }, []);

    if (isAuthorized === null) {
        return <></>; 
    }

    return isAuthorized ? targetPage : <Navigate to="/" state={{ from: window.location.pathname }} />;
}
