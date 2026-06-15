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
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar
              dataKey="income"
              name="Income"
              fill="#00C49F"
              radius={[5, 5, 0, 0]}
            />

            <Bar
              dataKey="expense"
              name="Expense"
              fill="#FF8042"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChartComponent;
