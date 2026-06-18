import { useTheme } from "../../context/useTheme";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import "./PieChartComponent.css";

function PieChartComponent({ title, items }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const chartData = [];
  const COLORS = ["#3b82f6", "#22c55e", "#eab308", "#ef4444", "#8b5cf6"];
  items?.forEach((item) => {
    const existingCategory = chartData.find(
      (data) => data.category === item.category,
    );

    if (existingCategory) {
      existingCategory.amount += item.amount;
    } else {
      chartData.push({
        category: item.category,
        amount: item.amount,
      });
    }
  });

  return (
    <div className="chart-card">
      <h2 className="chart-title">{title}</h2>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ category, percent }) =>
                `${category} ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1e293b" : "#ffffff",
                border: "1px solid #334155",
                borderRadius: "10px",
              }}
            />
            <Legend
              wrapperStyle={{
                color: isDark ? "#f8fafc" : "#0f172a",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PieChartComponent;
