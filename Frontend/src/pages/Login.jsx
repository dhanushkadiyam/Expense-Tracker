import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log(response.data);
      localStorage.setItem("token", response.data.token);

      toast.success("Login successful");

      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label>Email</label>
            <br />
            <input
              className="auth-input"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <br />

          <div className="auth-form-group">
            <label>Password</label>
            <br />
            <input
              className="auth-input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="auth-link">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
