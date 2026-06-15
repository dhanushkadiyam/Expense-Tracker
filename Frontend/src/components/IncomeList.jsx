import { useEffect } from "react";
import api from "../services/api";
import "./ListCard.css";

function IncomeList({ incomes, setIncomes, setSelectedIncome }) {
  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/income", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);

        setIncomes(response.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchIncomes();
  }, [setIncomes]);

  const handleDelete = async (incomeId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.delete(`/income/${incomeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setIncomes(incomes.filter((income) => income._id !== incomeId));
    } catch (error) {
      console.log(error.response?.data);
    }
  };
  return (
    <div>
      <h2>Income List</h2>
      {incomes.map((income) => (
        <div key={income._id} className="list-card">
          <h3>{income.title}</h3>

          <p>Amount: ₹{income.amount}</p>

          <p>Category: {income.category}</p>

          <p>Date: {new Date(income.date).toLocaleDateString()}</p>
          <div className="card-buttons">
            <button onClick={() => setSelectedIncome(income)}>Edit</button>
            <button
              onClick={() => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete this income?",
                );

                if (confirmed) {
                  handleDelete(income._id);
                }
              }}
            >
              Delete
            </button>
          </div>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default IncomeList;
