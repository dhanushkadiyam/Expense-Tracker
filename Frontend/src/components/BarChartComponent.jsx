import "./BarChartComponent.css";
import { useTheme } from "../context/useTheme";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
function BarChartComponent({ income, expenses }) {
  console.log(income);
  console.log(expenses);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const chartData = months.map((month) => ({
    month,
    income: 0,
    expense: 0,
  }));
  income?.forEach((item) => {
    const monthIndex = new Date(item.date).getMonth();

    chartData[monthIndex].income += item.amount;
  });
  expenses?.forEach((item) => {
    const monthIndex = new Date(item.date).getMonth();

    chartData[monthIndex].expense += item.amount;
  });
  console.log(chartData);
  return (
    <div className="chart-card">
      <h2 className="chart-title">Monthly Income vs Expense</h2>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" stroke={isDark ? "#94a3b8" : "#64748b"} />

            <YAxis stroke={isDark ? "#94a3b8" : "#64748b"} />
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

            <Bar
              dataKey="income"
              name="Income"
              fill="#22c55e"
              radius={[5, 5, 0, 0]}
            />

            <Bar
              dataKey="expense"
              name="Expense"
              fill="#ef4444"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChartComponent;
