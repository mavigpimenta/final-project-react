import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import EditProfilePage from "../pages/EditProfilePage";
import RegisterPage from "../pages/RegisterPage";
import MainPage from "../pages/MainPage";
import PostDetailPage from "../pages/PostDetailPage";
import 'react-toastify/dist/ReactToastify.css';
import { SearchUsers } from "../pages/SearchUsers";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/updatePass",  
    element: (
      <ProtectedRoute
        errorPage={<ErrorPage />}
        targetPage={<EditProfilePage />}
      />
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute
        errorPage={<ErrorPage />}
        targetPage={<MainPage />}
      />
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute
        errorPage={<ErrorPage />}
        targetPage={<SearchUsers />}
      />
    ),
  },
  { 
    path: "/detail/:id",
    element: (
      <ProtectedRoute
        errorPage={<ErrorPage />}
        targetPage={<PostDetailPage />}
      />
    ),
  }
]);