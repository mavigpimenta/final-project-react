import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import EditProfilePage from "../pages/EditProfilePage";
import RegisterPage from "../pages/RegisterPage";

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
  }
]);