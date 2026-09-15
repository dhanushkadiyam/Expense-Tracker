import { useState } from "react";
import api from "../services/api";
import "./TransactionForm.css";
import { toast } from "react-toastify";
import {
  expenseCategories,
  paymentMethods,
} from "../constants/transactionPresets";

function AddExpense({
  expenses,
  setExpenses,
  selectedExpense,
  setSelectedExpense,
  setShowExpenseModal,
}) {
  const [title, setTitle] = useState(selectedExpense?.title || "");
  const [amount, setAmount] = useState(selectedExpense?.amount || "");
  const [category, setCategory] = useState(selectedExpense?.category || "");
  const [date, setDate] = useState(
    selectedExpense?.date ? selectedExpense.date.split("T")[0] : "",
  );
  const [paymentMethod, setPaymentMethod] = useState(
    selectedExpense?.paymentMethod || "Cash",
  );
  const [notes, setNotes] = useState(selectedExpense?.notes || "");

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
            paymentMethod,
            notes,
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
            paymentMethod,
            notes,
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
        toast.success("Expense added successfully");
      } else {
        setExpenses(
          expenses.map((expense) =>
            expense._id === selectedExpense._id
              ? response.data.expense
              : expense,
          ),
        );
        toast.success("Expense updated successfully");
      }

      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
      setPaymentMethod("Cash");
      setNotes("");

      setSelectedExpense(null);
      setShowExpenseModal(false);
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to save expense");
    }
  };

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
            list="expense-categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <datalist id="expense-categories">
            {expenseCategories.map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        <button className="submit-btn" type="submit">
          {selectedExpense ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
}
export default AddExpense;
