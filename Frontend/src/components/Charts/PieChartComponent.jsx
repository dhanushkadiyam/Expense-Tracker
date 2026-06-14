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
  const chartData = [];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
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
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PieChartComponent;
