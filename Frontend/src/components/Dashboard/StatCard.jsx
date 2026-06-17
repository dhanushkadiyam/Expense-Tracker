import "./StatCard.css";
function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <h3>{title}</h3>
        {icon}
      </div>

      <h2>{value}</h2>
    </div>
  );
}

export default StatCard;
