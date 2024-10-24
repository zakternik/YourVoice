import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

export const publicRoutes = [
    { name: "Domov", to: "/", visible: true, element: <Home /> },
    { name: "Prijava", to: "/login", visible: true, element: <Login /> },
];

export const protectedRoutes = [
    { name: "Logout", to: "/logout", visible: true, element: <Logout /> },
];
