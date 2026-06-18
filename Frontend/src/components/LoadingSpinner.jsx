import "./LoadingSpinner.css";

function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="loading-container">
      <div className="spinner"></div>

      <h3>{text}</h3>
    </div>
  );
}

export default LoadingSpinner;
