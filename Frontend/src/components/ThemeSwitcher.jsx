import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";
import { useTheme } from "../context/useTheme";
import "./ThemeSwitcher.css";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <button
        title="Light Mode"
        className={theme === "light" ? "active" : ""}
        onClick={() => setTheme("light")}
      >
        <FaSun />
      </button>

      <button
        title="Dark Mode"
        className={theme === "dark" ? "active" : ""}
        onClick={() => setTheme("dark")}
      >
        <FaMoon />
      </button>

      <button
        title="System Theme"
        className={theme === "system" ? "active" : ""}
        onClick={() => setTheme("system")}
      >
        <FaDesktop />
      </button>
    </div>
  );
}

export default ThemeSwitcher;
