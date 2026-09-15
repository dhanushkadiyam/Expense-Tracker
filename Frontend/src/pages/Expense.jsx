import AddExpense from "../components/AddExpense";
import ExpenseList from "../components/ExpenseList";
import { useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import ExportCSVButton from "../components/ExportCSVButton";
import ExportPDFButton from "../components/ExportPDFButton";
import { FaList, FaEye } from "react-icons/fa";
import { FaArrowTrendDown } from "react-icons/fa6";
import { paymentMethods } from "../constants/transactionPresets";

function Expense() {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  const categories = [
    "All",
    ...new Set(expenses.map((expense) => expense.category)),
  ];
  const filteredExpenses = expenses
    .filter((expense) => {
      const matchesSearch = expense.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || expense.category === selectedCategory;
      const expenseDate = expense.date.split("T")[0];
      const matchesDateFrom = !dateFrom || expenseDate >= dateFrom;
      const matchesDateTo = !dateTo || expenseDate <= dateTo;
      const matchesMinAmount =
        !minAmount || expense.amount >= Number(minAmount);
      const matchesMaxAmount =
        !maxAmount || expense.amount <= Number(maxAmount);
      const matchesPaymentMethod =
        paymentMethod === "All" ||
        (expense.paymentMethod || "Cash") === paymentMethod;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDateFrom &&
        matchesDateTo &&
        matchesMinAmount &&
        matchesMaxAmount &&
        matchesPaymentMethod
      );
    })
    .sort((first, second) => {
      const firstValue =
        sortBy === "amount" ? first.amount : new Date(first.date);
      const secondValue =
        sortBy === "amount" ? second.amount : new Date(second.date);
      const result =
        firstValue > secondValue ? 1 : firstValue < secondValue ? -1 : 0;
      return sortDirection === "asc" ? result : -result;
    });
  return (
    <MainLayout>
      <div>
        <div className="page-header">
          <div>
            <h1>Expense Tracker</h1>
            <p>Manage and review all your expense transactions.</p>
          </div>

          <button
            className="primary-btn"
            onClick={() => setShowExpenseModal(true)}
          >
            + Add Expense
          </button>
        </div>
        <div className="income-stats">
          <div className="income-stat-card">
            <h4>
              <FaList />
              Total Records
            </h4>
            <h2>{expenses.length}</h2>
          </div>

          <div className="income-stat-card">
            <h4>
              <FaEye />
              Showing
            </h4>
            <h2>
              {filteredExpenses.length} of {expenses.length}
            </h2>
          </div>

          <div className="income-stat-card">
            <h4>
              <FaArrowTrendDown />
              Total Expense
            </h4>
            <h2>
              ₹
              {expenses
                .reduce((sum, expense) => sum + expense.amount, 0)
                .toLocaleString()}
            </h2>
          </div>
        </div>
        <div className="toolbar">
          <input
            className="search-input"
            type="text"
            placeholder="Search expense..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="Min amount"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="Max amount"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
          />
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="All">All methods</option>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Sort by date</option>
            <option value="amount">Sort by amount</option>
          </select>
          <select
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>

          <ExportCSVButton data={filteredExpenses} fileName="expenses" />
          <ExportPDFButton data={filteredExpenses} fileName="expenses" />
        </div>

        {showExpenseModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{selectedExpense ? "Edit Expense" : "Add Expense"}</h2>

                <button
                  className="close-btn"
                  onClick={() => {
                    setShowExpenseModal(false);
                    setSelectedExpense(null);
                  }}
                >
                  ✕
                </button>
              </div>

              <AddExpense
                key={(selectedExpense && selectedExpense._id) || "new"}
                expenses={expenses}
                setExpenses={setExpenses}
                selectedExpense={selectedExpense}
                setSelectedExpense={setSelectedExpense}
                setShowExpenseModal={setShowExpenseModal}
              />
            </div>
          </div>
        )}

        <ExpenseList
          expenses={filteredExpenses}
          setExpenses={setExpenses}
          setSelectedExpense={setSelectedExpense}
          setShowExpenseModal={setShowExpenseModal}
        />
      </div>
    </MainLayout>
  );
}

export default Expense;
