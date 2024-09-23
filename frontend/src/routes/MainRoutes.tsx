import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import EditProfilePage from "../pages/EditProfilePage";
import RegisterPage from "../pages/RegisterPage";
import MainPage from "../pages/MainPage";
import PostDetailPage from "../pages/PostDetailPage";
import 'react-toastify/dist/ReactToastify.css';

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
    element: <EditProfilePage />,
  },
  {
    path: "/home",
    element: <MainPage />,
  },
  {
    path: "/detail/:id",
    element: <PostDetailPage />,
  }
]);