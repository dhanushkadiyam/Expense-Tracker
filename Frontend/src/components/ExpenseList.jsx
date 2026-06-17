import { useState, useEffect } from "react";
import api from "../services/api";
import "./ListCard.css";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";
import LoadingSpinner from "./LoadingSpinner";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaArrowTrendDown } from "react-icons/fa6";

function ExpenseList({
  expenses,
  setExpenses,
  setSelectedExpense,
  setShowExpenseModal,
}) {
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
          <div key={expense._id} className="transaction-row">
            <div className="transaction-main">
              <div className="transaction-left">
                <div className="transaction-title-row">
                  <FaArrowTrendDown className="expense-icon" />

                  <h3>{expense.title}</h3>
                </div>

                <p>
                  {expense.category} •{" "}
                  {new Date(expense.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="transaction-right">
                <span className="transaction-amount">
                  ₹{expense.amount.toLocaleString()}
                </span>

                <button
                  onClick={() => {
                    setSelectedExpense(expense);
                    setShowExpenseModal(true);
                  }}
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => {
                    setExpenseToDelete(expense._id);
                    setShowDeleteModal(true);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
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
