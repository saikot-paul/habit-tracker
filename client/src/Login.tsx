// Login.tsx

import React, { useState } from 'react';
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import './assets/Login.css';
import Home from './pages/Home';
import Register from './pages/Register.tsx';
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
    <div>
    <div className="top-bar">
    <h1 className="title">Simply<span className="colored-words">Plan.</span></h1>
  </div>
    <div className="login-container">
      <h2>Login</h2>
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
        <label>Dont have an account? Create one <Link to="/register"><span className="colored-words">now.</span></Link></label>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
    </div>
  );
};

export default Login;
