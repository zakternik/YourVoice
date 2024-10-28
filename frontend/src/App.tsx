// App.tsx
import './App.css';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { publicRoutes, protectedRoutes } from './routes';
import { User } from './interfaces/User';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import { UserContext } from './userContext';

function App() {
  const [user, setUser] = useState<User | null>(
    localStorage.user ? JSON.parse(localStorage.user) : null
  );

  const updateUserData: Dispatch<SetStateAction<User | null>> = (userInfo) => {
    if (typeof userInfo === 'function') {
      const updatedUser = userInfo(user);
      if (updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        localStorage.removeItem('user');
      }
      setUser(updatedUser);
    } else {
      if (userInfo) {
        localStorage.setItem('user', JSON.stringify(userInfo));
      } else {
        localStorage.removeItem('user');
      }
      setUser(userInfo);
    }
  };

  return (
    <BrowserRouter>
      {/* Prenos uporabniškega stanja do Header */}
      <UserContext.Provider value={{ user, setUserContext: updateUserData }}>
        <Header />
        <main className="container">
          <Routes>
            {/* Javni Routes */}
            {publicRoutes.map((route) => (
              <Route key={route.to} path={route.to} element={route.element} />
            ))}

            {/* Zaščiteni Routes */}
            {protectedRoutes.map((route) => (
              <Route
                key={route.to}
                path={route.to}
                element={<ProtectedRoute user={user} element={route.element} />}
              />
            ))}
          </Routes>
        </main>
      </UserContext.Provider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
