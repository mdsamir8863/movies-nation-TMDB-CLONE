import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.scss";
import logo from "../../../assets/movix-logo.svg";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log("Login successful:", response.data);
      navigate("/home", { replace: true });
      window.location.reload();
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Failed to login. Please try again."
      );
    }
  };

  return (
    <>
      <nav>
        <img className="Movielogo" src={logo} alt="Movix Logo" />
      </nav>
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="false"
            />
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
          <p className="toggle-link">
            Don't have an account?
            <span className="signupLink" onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
