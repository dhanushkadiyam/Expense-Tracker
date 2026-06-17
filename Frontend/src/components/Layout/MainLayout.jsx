import Sidebar from "../Sidebar";
import "./MainLayout.css";

function MainLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />

      <div className="page-container">{children}</div>
    </div>
  );
}

export default MainLayout;
