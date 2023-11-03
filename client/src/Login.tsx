// Login.tsx

import React, { useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import './assets/Login.css'; // Import your CSS file for styling
import Home from './pages/Home';

const Login: React.FC = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate('/home');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !password) {
      setError('Please fill in both fields');
      return;
    }

    if (user === 'John Doe' && password === 'password') {
      // Simulate a successful login
      setError(''); // Clear any previous error message
    } else {
      setError('Invalid Username or password');
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
        <button type="submit" onClick={gotoHome} className="login-button">
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
