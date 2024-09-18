import { createBrowserRouter } from "react-router-dom";
import EditProfilePage from "../pages/EditProfilePage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <EditProfilePage />,
  }
]);