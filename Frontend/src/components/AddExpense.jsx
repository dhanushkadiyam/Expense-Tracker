import { useEffect, useState } from "react";
import api from "../services/api";
import "./AddIncome.css";

function AddExpense({
  selectedExpense,
  setSelectedExpense,
  expenses,
  setExpenses,
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

      if (selectedExpense) {
        response = await api.put(
          `/expenses/${selectedExpense._id}`,
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
          "/expenses",
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
      if (!selectedExpense) {
        setExpenses([...expenses, response.data.expense]);
      } else {
        setExpenses(
          expenses.map((expense) =>
            expense._id === selectedExpense._id
              ? response.data.expense
              : expense,
          ),
        );
      }

      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
      setSelectedExpense(null);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    if (selectedExpense) {
      console.log(selectedExpense);
      setTitle(selectedExpense.title);
      setAmount(selectedExpense.amount);
      setCategory(selectedExpense.category);
      setDate(selectedExpense.date.split("T")[0]);
    }
  }, [selectedExpense]);

  return (
    <div className="form-container">
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <br />

        <div className="form-group">
          <label>Amount</label>
          <br />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <br />

        <div className="form-group">
          <label>Category</label>
          <br />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <br />

        <div className="form-group">
          <label>Date</label>
          <br />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <br />

        <button className="submit-btn" type="submit">
          {selectedExpense ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
}
export default AddExpense;
