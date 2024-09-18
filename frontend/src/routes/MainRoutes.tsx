import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RegisterPage />,
  }
]);