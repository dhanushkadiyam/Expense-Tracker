import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {

  const fetchDashboardData = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`
        }
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
    <div>
      <h1>Dashboard Page</h1>

      <div>
        <h2>Total Income: ₹{dashboardData?.totalIncome}</h2>

        <h2>Total Expense: ₹{dashboardData?.totalExpense}</h2>

        <h2>Balance: ₹{dashboardData?.balance}</h2>

        <h2>Recent Expenses</h2>

        {
        dashboardData?.recentExpenses?.map((expense) => (
            <div key={expense._id}>
            <p>
                {expense.title} - ₹{expense.amount}
            </p>
            </div>
        ))
        }

        <h2>Recent Income</h2>

        {
        dashboardData?.recentIncome?.map((income) => (
            <div key={income._id}>
            <p>
                {income.title} - ₹{income.amount}
            </p>
            </div>
        ))
        }
        
      </div>
    </div>
  );
}

export default Dashboard;