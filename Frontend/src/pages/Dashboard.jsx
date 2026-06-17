import { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../components/Layout/MainLayout";
import StatCard from "../components/Dashboard/StatCard";
import "./Dashboard.css";
import PieChartComponent from "../components/Charts/PieChartComponent";
import BarChartComponent from "../components/BarChartComponent";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

import { HiArrowTrendingUp } from "react-icons/hi2";
import { HiArrowTrendingDown } from "react-icons/hi2";
import { FaWallet } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

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
        setLoading(false);
      } catch (error) {
        console.log(error.response?.data);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  if (loading) {
    return <LoadingSpinner text="Loading Dashboard..." />;
  }

  return (
    <MainLayout>
      <div>
        <div>
          <div className="dashboard-header">
            <div>
              <h1>Hi, {user?.name} 👋</h1>{" "}
              <p>Here's your financial overview.</p>
            </div>

            <div className="dashboard-actions">
              <button onClick={() => navigate("/income")}>+ Add Income</button>

              <button onClick={() => navigate("/expense")}>
                + Add Expense
              </button>
            </div>
          </div>
          <div className="stats-grid">
            <StatCard
              title="Total Income"
              value={`₹${dashboardData?.totalIncome?.toLocaleString()}`}
              icon={<HiArrowTrendingUp />}
            />

            <StatCard
              title="Total Expense"
              value={`₹${dashboardData?.totalExpense?.toLocaleString()}`}
              icon={<HiArrowTrendingDown />}
            />

            <StatCard
              title="Balance"
              value={`₹${dashboardData?.balance?.toLocaleString()}`}
              icon={<FaWallet />}
            />

            <StatCard
              title="This Month Net"
              value={`₹${dashboardData?.monthlyNet?.toLocaleString()}`}
              icon={<BsGraphUpArrow />}
            />
          </div>

          <div className="bar-chart-section">
            <BarChartComponent
              income={dashboardData?.allIncome}
              expenses={dashboardData?.allExpenses}
            />
          </div>

          <div className="pie-grid">
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
          <div className="activity-card">
            <div className="activity-header">
              <h2>Recent Activity</h2>
              <span>{dashboardData?.recentActivity?.length || 0} Records</span>
            </div>

            {dashboardData?.recentActivity?.map((item) => (
              <div
                key={item._id}
                className="activity-row"
                onClick={() =>
                  navigate(item.type === "income" ? "/income" : "/expense")
                }
              >
                <div className="activity-left">
                  <h4>
                    {item.type === "income" ? "💰" : "📉"} {item.title}
                  </h4>

                  <p>
                    {item.category} •{" "}
                    {new Date(item.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <span className="activity-amount">
                  ₹{item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
