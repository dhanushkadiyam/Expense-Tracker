import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };
  if (location.pathname === "/" || location.pathname === "/register") {
    return null;
  }
  return (
    <div className="navbar">
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/income">Income</Link>

        <Link to="/expense">Expense</Link>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
