import { createBrowserRouter } from "react-router-dom";
import TestPage from "../pages/TestPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <TestPage />,
  }
]);