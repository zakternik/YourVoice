import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Posts from './pages/Posts';
import Profile from './pages/Profile';
import Register from './pages/Register';

export const publicRoutes = [
  { name: 'Domov', to: '/', visible: true, element: <Home /> },
  {
    name: 'Registracija',
    to: '/register',
    visible: true,
    element: <Register />,
  },
  { name: 'Prijava', to: '/login', visible: true, element: <Login /> },
  { name: 'Objave', to: '/posts', visible: true, element: <Posts /> },
];

export const protectedRoutes = [
  { name: 'Logout', to: '/logout', visible: true, element: <Logout /> },
  { name: 'Profile', to: '/profile', visible: true, element: <Profile /> },
];
