import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home/home";
import { SignIn } from "../pages/signIn/signIn";
import { User } from "../pages/user/user";
import { MainLayout } from "../layouts/mainLayouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/profile",
        element: <User />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
