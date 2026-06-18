import "./StatCard.css";

function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <h4>{title}</h4>

        <div className="stat-icon">{icon}</div>
      </div>

      <h2>{value}</h2>

      <p className="stat-subtitle">Financial Summary</p>
    </div>
  );
}

export default StatCard;
