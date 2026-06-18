import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log(response.data);
      setLoading(false);
      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      console.log(error.response?.data);

      toast.error(error.response?.data?.message || "Registration failed");
      setLoading(false);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account 🚀</h1>

        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label>Name</label>
            <input
              className="auth-input"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="auth-form-group">
            <label>Email</label>
            <input
              className="auth-input"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth-form-group">
            <label>Password</label>
            <input
              className="auth-input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="auth-form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="auth-input"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
          <div className="auth-link">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
