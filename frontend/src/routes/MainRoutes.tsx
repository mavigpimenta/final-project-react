import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  }
]);