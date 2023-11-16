import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import '../assets/Login.css';

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
  
    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    };

    return (
        <div>
          <div className="top-bar">
            <h1 className="title">Simply<span className="colored-words">Plan.</span></h1>
          </div>
          <div className="login-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  className="input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
              <button type="submit" className="register-button">Register</button>
              <label>
                Already have an account? Login <Link to="/login"><span className="colored-words">here.</span></Link>
              </label>
            </form>
          </div>
        </div>
      );
    };
    
export default Register;