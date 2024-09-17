import { createBrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
  }
]);