import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.scss";
import logo from "../../../assets/movix-logo.svg";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        email,
        username,
        password,
      });
      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "Failed to create account. Please try again."
      );
    }
  };

  return (
    <>
      <nav>
        <img className="Movielogo" src={logo} alt="Movix Logo" />
      </nav>
      <div className="signup-container">
        <form onSubmit={handleSignup} className="signup-form">
          <h2>Sign Up</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="false"
            />
          </div>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="false"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="false"
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          <p className="login-prompt">
            Already have an account?
            <span className="loginLink" onClick={() => navigate("/login")}>
              Log in
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignupPage;
