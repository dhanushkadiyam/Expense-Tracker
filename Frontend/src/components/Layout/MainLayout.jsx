import Navbar from "../Navbar";
import "./MainLayout.css";

function MainLayout({ children }) {
  return (
    <div>
      <Navbar />

      <div className="page-container">{children}</div>
    </div>
  );
}

export default MainLayout;
