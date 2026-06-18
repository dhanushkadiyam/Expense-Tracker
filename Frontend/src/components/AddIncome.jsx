import { useEffect, useState } from "react";
import api from "../services/api";
import "./TransactionForm.css";
import { toast } from "react-toastify";

function AddIncome({
  incomes,
  setIncomes,
  selectedIncome,
  setSelectedIncome,
  setShowIncomeModal,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      let response;

      if (selectedIncome) {
        response = await api.put(
          `/income/${selectedIncome._id}`,
          {
            title,
            amount,
            category,
            date,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else {
        response = await api.post(
          "/income",
          {
            title,
            amount,
            category,
            date,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      console.log(response.data);

      if (!selectedIncome) {
        setIncomes([...incomes, response.data.income]);
        toast.success("Income added successfully");
      } else {
        setIncomes(
          incomes.map((income) =>
            income._id === selectedIncome._id ? response.data.income : income,
          ),
        );
        toast.success("Income updated successfully");
      }
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");

      setSelectedIncome(null);
      setShowIncomeModal(false);
    } catch (error) {
      console.log(error.response?.data);

      toast.error("Failed to save income");
    }
  };
  useEffect(() => {
    if (selectedIncome) {
      setTitle(selectedIncome.title);
      setAmount(selectedIncome.amount);
      setCategory(selectedIncome.category);
      setDate(selectedIncome.date.split("T")[0]);
    }
  }, [selectedIncome]);
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button className="submit-btn" type="submit">
          {selectedIncome ? "Update Income" : "Add Income"}
        </button>
      </form>
    </div>
  );
}

export default AddIncome;
