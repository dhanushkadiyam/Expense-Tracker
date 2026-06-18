import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { MdDashboard } from "react-icons/md";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { HiArrowTrendingDown } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";
import ThemeSwitcher from "./ThemeSwitcher";
import { FaCog } from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

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
        <Link to="/settings">
          <FaCog />
          <span>Settings</span>
        </Link>
      </div>
      <div className="sidebar-footer">
        <ThemeSwitcher />
        <div className="sidebar-profile">
          <div className="profile-avatar">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="profile-info">
            <h4>{user?.name}</h4>
            <p>{user?.email}</p>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
