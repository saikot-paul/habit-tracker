// Login.tsx

import React, { useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import './assets/Login.css'; // Import your CSS file for styling
import Home from './pages/Home';
import axios from "axios";

const Login: React.FC = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate("/home");
  };

  const baseURL = "http://localhost:3000/";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !password) {
      setError("Missing both/either username or password");
      return;
    }

    try {
      await axios
        .post(baseURL + "login", {
          username: user,
          password: password,
        })
        .then((response) => {
          if (response.status == 200 && response.data.success) {
            setError("");
            gotoHome();
          } else {
            setError(response.data.message);
            console.log(error);
          }
        });
    } catch (error) {
      setError("Login Error");
    }
  };

  return (
    <div className="login-container">
      <h1>Habit Tracker</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="input-field"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
