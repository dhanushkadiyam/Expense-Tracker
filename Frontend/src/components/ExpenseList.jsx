import { useEffect } from "react";
import api from "../services/api";
import "./ListCard.css";

function ExpenseList({ expenses, setExpenses, setSelectedExpense }) {
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/expenses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);

        setExpenses(response.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchExpenses();
  }, [setExpenses]);

  const handleDelete = async (expenseId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.delete(`/expenses/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      setExpenses(expenses.filter((expense) => expense._id !== expenseId));
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div>
      <h2>Expense List</h2>

      {expenses.map((expense) => (
        <div key={expense._id} className="list-card">
          <h3>{expense.title}</h3>

          <p>Amount: ₹{expense.amount}</p>

          <p>Category: {expense.category}</p>

          <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
          <div className="card-buttons">
            <button onClick={() => setSelectedExpense(expense)}>Edit</button>
            <button
              onClick={() => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete this expense?",
                );

                if (confirmed) {
                  handleDelete(expense._id);
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

export default ExpenseList;
