import { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../components/Layout/MainLayout";
import StatCard from "../components/Dashboard/StatCard";
import "./Dashboard.css";
import PieChartComponent from "../components/Charts/PieChartComponent";
import BarChartComponent from "../components/BarChartComponent";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);

        setDashboardData(response.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <MainLayout>
      <div>
        <h1>Dashboard Page</h1>

        <div>
          <div className="cards-container">
            <StatCard
              title="Total Income"
              value={`₹${dashboardData?.totalIncome}`}
            />
            <StatCard
              title="Total Expense"
              value={`₹${dashboardData?.totalExpense}`}
            />
            <StatCard title="Balance" value={`₹${dashboardData?.balance}`} />
          </div>
          <div className="charts-container">
            <BarChartComponent
              income={dashboardData?.allIncome}
              expenses={dashboardData?.allExpenses}
            />
            <div className="chart-box">
              <PieChartComponent
                title="Expense Distribution"
                items={dashboardData?.allExpenses}
              />
            </div>

            <div className="chart-box">
              <PieChartComponent
                title="Income Distribution"
                items={dashboardData?.allIncome}
              />
            </div>
          </div>
          <div className="section-card">
            <h2>Recent Expenses</h2>

            {dashboardData?.recentExpenses?.map((expense) => (
              <div key={expense._id} className="section-item">
                {expense.title} - ₹{expense.amount}
              </div>
            ))}
          </div>

          <div className="section-card">
            <h2>Recent Income</h2>

            {dashboardData?.recentIncome?.map((income) => (
              <div key={income._id} className="section-item">
                {income.title} - ₹{income.amount}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
