import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/Login.css";
import axios from "axios";
import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_q8w00yl';
const EMAILJS_TEMPLATE_ID = 'template_r05vhw8';
(function(){
  emailjs.init("AF8-pgZInaRGZXMXt");
})();

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const gotoHome = (uid: string) => {
    navigate("/maincontent", { state: { uid: uid } });
  };

  const baseURL = "http://localhost:3000/";

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !username || !password) {
      setError(
        "Email, password, or username has invalid format please try again"
      );
      return;
    }

    await axios
      .post(baseURL + "signup", {
        email: email,
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200 && response.data.success === true) {
          const uid = response.data.user.uid;
          const uemail = response.data.user.email;
          const verificationLink = response.data.verificationLink;
          console.log("verif below");
          console.log(verificationLink);
          const templateParams = {
            to_email: uemail,
            verification_link: verificationLink
        };
          // send verification email
          emailjs.send(
              EMAILJS_SERVICE_ID,
              EMAILJS_TEMPLATE_ID,
              templateParams
          );

          console.log(uid);
          gotoHome(uid);
        } else {
          setError(response.data.message || "Unknown error occurred");
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.message);
      });
  };

  return (
    <div>
      <div className="top-bar">
        <h1 className="title">
          Simply<span className="colored-words">Plan.</span>
        </h1>
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
          <button type="submit" className="register-button">
            Register
          </button>
          <label>
            Already have an account? Login{" "}
            <Link to="/login">
              <span className="colored-words">here.</span>
            </Link>
          </label>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
