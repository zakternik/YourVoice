import './App.css';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Dispatch, SetStateAction, useState } from "react";
import { publicRoutes, protectedRoutes } from './routes';
import { User } from './interfaces/User'; // Ensure this path is correct
import ProtectedRoute from './components/ProtectedRoute'; // Ensure this path is correct
import Header from './components/Header';
import Footer from './components/Footer';
import { UserContext } from './userContext';

function App() {
    const [user, setUser] = useState<User | null>(localStorage.user ? JSON.parse(localStorage.user) : null);

    // Ensure updateUserData can handle both User and a function that returns User
    const updateUserData: Dispatch<SetStateAction<User | null>> = (userInfo) => {
        if (typeof userInfo === 'function') {
            const updatedUser = userInfo(user); // user is the current state
            if (updatedUser) {
                localStorage.setItem("user", JSON.stringify(updatedUser));
            } else {
                localStorage.removeItem("user");
            }
            setUser(updatedUser);
        } else {
            if (userInfo) {
                localStorage.setItem("user", JSON.stringify(userInfo));
            } else {
                localStorage.removeItem("user");
            }
            setUser(userInfo);
        }
    };

    return (
        <BrowserRouter>
            <Header />
            <UserContext.Provider value={{ user, setUserContext: updateUserData }}>
                <main className='container'>
                    <Routes>
                        {/* Public Routes */}
                        {publicRoutes.map(route => (
                            <Route key={route.to} path={route.to} element={route.element} />
                        ))}

                        {/* Protected Routes */}
                        {protectedRoutes.map(route => (
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
