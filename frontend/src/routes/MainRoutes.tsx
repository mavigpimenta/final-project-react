import { createBrowserRouter } from "react-router-dom";
// import RegisterPage from "../pages/RegisterPage";
import TestPage from "../pages/TestPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <TestPage />,
  }
]);