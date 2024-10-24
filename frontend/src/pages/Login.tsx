import React, { useContext, useState, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext, UserContextType } from '../userContext'; // Ensure UserContextType is imported

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const userContext = useContext<UserContextType>(UserContext); // Ensure UserContextType is correctly defined

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      // Check if the response is okay
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();

      // Assuming data structure has an _id for a successful login
      if (data && data._id) {
        userContext.setUserContext(data);
      } else {
        setUsername('');
        setPassword('');
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to log in. Please try again.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {userContext.user ? <Navigate replace to="/" /> : null}
      <input
        type="text"
        name="username"
        placeholder="Uporabniško ime"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Geslo"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <input
        className="btn btn-success"
        type="submit"
        name="submit"
        value="Prijava"
      />
      <br />
      <br />
      {error && <label>{error}</label>}
    </form>
  );
};

export default Login;
