import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { FaThLarge, FaChartLine, FaMoneyBillWave, FaCog } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";
import { FiLogOut } from "react-icons/fi";

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
    <div className="sidebar">
      <h2 className="logo">Expense Tracker</h2>
      <div className="nav-links">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          <FaThLarge />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/income"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          <FaChartLine />
          <span>Income</span>
        </NavLink>

        <NavLink
          to="/expense"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          <FaMoneyBillWave />
          <span>Expense</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          <FaCog />
          <span>Settings</span>
        </NavLink>
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
