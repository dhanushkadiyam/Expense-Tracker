import { useEffect, useState } from "react";
import api from "../services/api";
import "./ListCard.css";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";
import LoadingSpinner from "./LoadingSpinner";

function IncomeList({ incomes, setIncomes, setSelectedIncome }) {
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
    <div>
      <h2>Income List</h2>
      {incomes.length === 0 ? (
        <p className="empty-state">No income records found.</p>
      ) : (
        incomes.map((income) => (
          <div key={income._id} className="list-card">
            <h3>{income.title}</h3>

            <p>Amount: ₹{income.amount.toLocaleString()}</p>

            <p>Category: {income.category}</p>

            <p>Date: {new Date(income.date).toLocaleDateString()}</p>

            <div className="card-buttons">
              <button onClick={() => setSelectedIncome(income)}>Edit</button>

              <button
                onClick={() => {
                  setIncomeToDelete(income._id);
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
