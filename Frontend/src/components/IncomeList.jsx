import { useEffect, useState } from "react";
import api from "../services/api";
import "./ListCard.css";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";
import LoadingSpinner from "./LoadingSpinner";
import { FaEdit, FaTrash, FaMoneyBillWave } from "react-icons/fa";

function IncomeList({
  incomes,
  setIncomes,
  setSelectedIncome,
  setShowIncomeModal,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [incomeToDelete, setIncomeToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/income", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIncomes(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response?.data);
        setLoading(false);
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

      toast.success("Income deleted successfully");
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to delete income");
    }
  };

  const confirmDelete = async () => {
    if (!incomeToDelete) return;

    await handleDelete(incomeToDelete);

    setShowDeleteModal(false);
    setIncomeToDelete(null);
  };
  if (loading) {
    return <LoadingSpinner text="Loading Incomes..." />;
  }
  return (
    <div className="transactions-wrapper">
      <h2 className="list-title">Recent Income Transactions</h2>
      <div className="transactions-container">
        {incomes.length === 0 ? (
          <p className="empty-state">No income records found.</p>
        ) : (
          incomes.map((income) => (
            <div key={income._id} className="transaction-row">
              <div className="transaction-main">
                <div className="transaction-left">
                  <div className="transaction-title-row">
                    <FaMoneyBillWave className="income-icon" />

                    <h3>{income.title}</h3>
                  </div>

                  <p>
                    {income.category} •{" "}
                    {new Date(income.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="transaction-right">
                  <span className="transaction-amount">
                    ₹{income.amount.toLocaleString()}
                  </span>

                  <button
                    onClick={() => {
                      setSelectedIncome(income);
                      setShowIncomeModal(true);
                    }}
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => {
                      setIncomeToDelete(income._id);
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
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        title="Delete Income"
        message="Are you sure you want to delete this income?"
        onCancel={() => {
          setShowDeleteModal(false);
          setIncomeToDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default IncomeList;
