import { Link, useNavigate, useLocation } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {

  localStorage.removeItem("token");

  navigate("/");

  };
  if (
    location.pathname === "/" ||
    location.pathname === "/register"
    ) {
    return null;
  }
  return (
  <div>
    <Link to="/dashboard">Dashboard</Link>

    {" | "}

    <Link to="/income">Income</Link>

    {" | "}

    <Link to="/expense">Expense</Link>

    {" | "}

    <button onClick={handleLogout} >
      Logout
    </button>

    <hr />
  </div>
);
}

export default Navbar;