import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { MdDashboard } from "react-icons/md";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { HiArrowTrendingDown } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  if (location.pathname === "/" || location.pathname === "/register") {
    return null;
  }
  return (
    <div className="navbar">
      <h2 className="logo">Expense Tracker</h2>
      <div className="nav-links">
        <Link to="/dashboard">
          <MdDashboard />
          Dashboard
        </Link>
        <Link to="/income">
          <HiArrowTrendingUp />
          Income
        </Link>
        <Link to="/expense">
          <HiArrowTrendingDown />
          Expense
        </Link>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        <FiLogOut />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
