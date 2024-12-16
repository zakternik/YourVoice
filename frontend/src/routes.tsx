// routes.tsx
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Posts from './pages/Posts';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Edit from './pages/EditProfile';

export const publicRoutes = [
  { name: 'Domov', to: '/', visible: false, element: <Home /> },
  { name: 'Prijava', to: '/login', visible: true, element: <Login /> },
  {
    name: 'Registracija',
    to: '/register',
    visible: true,
    element: <Register />,
  },
  { name: 'Objave', to: '/posts', visible: true, element: <Posts /> },
];

export const protectedRoutes = [
  { name: 'Domov', to: '/', visible: false, element: <Home /> },
  { name: 'Objave', to: '/posts', visible: true, element: <Posts /> },
  { name: 'Profil', to: '/profile', visible: true, element: <Profile /> },
  { name: 'Odjava', to: '/logout', visible: true, element: <Logout /> },
  { name: 'Uredi', to: '/edit-profile', visible: false, element: <Edit /> },
];
