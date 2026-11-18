
import "./StatCard.css";

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-card-content">
        <p>{title}</p>
        <h2>{value}</h2>
      </div>

      <div className="stat-card-icon">
        <Icon size={28} />
      </div>
    </div>
  );
}

export default StatCard;
