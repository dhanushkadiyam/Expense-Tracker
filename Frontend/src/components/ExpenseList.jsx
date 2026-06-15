import { useState, useEffect } from "react";
import api from "../services/api";
import "./ListCard.css";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";
import LoadingSpinner from "./LoadingSpinner";
function ExpenseList({ expenses, setExpenses, setSelectedExpense }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.log(error.response?.data);
        setLoading(false);
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
      toast.success("Expense deleted successfully");
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to delete expense");
    }
  };
  const confirmDelete = async () => {
    if (!expenseToDelete) return;

    await handleDelete(expenseToDelete);

    setShowDeleteModal(false);
    setExpenseToDelete(null);
  };
  if (loading) {
    return <LoadingSpinner text="Loading Expenses..." />;
  }
  return (
    <div>
      <h2>Expense List</h2>
      {expenses.length === 0 ? (
        <p className="empty-state">No expense records found.</p>
      ) : (
        expenses.map((expense) => (
          <div key={expense._id} className="list-card">
            <h3>{expense.title}</h3>

            <p>Amount: ₹{expense.amount.toLocaleString()}</p>
            <p>Category: {expense.category}</p>

            <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
            <div className="card-buttons">
              <button onClick={() => setSelectedExpense(expense)}>Edit</button>
              <button
                onClick={() => {
                  setExpenseToDelete(expense._id);
                  setShowDeleteModal(true);
                }}
              >
                Delete
              </button>
            </div>

            <hr />
          </div>
        ))
      )}
      <DeleteModal
        isOpen={showDeleteModal}
        title="Delete Expense"
        message="Are you sure you want to delete this expense?"
        onCancel={() => {
          setShowDeleteModal(false);
          setExpenseToDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default ExpenseList;
