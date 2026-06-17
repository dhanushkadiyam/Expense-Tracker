import AddExpense from "../components/AddExpense";
import ExpenseList from "../components/ExpenseList";
import { useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import ExportCSVButton from "../components/ExportCSVButton";
import ExportPDFButton from "../components/ExportPDFButton";
import { FaList, FaEye } from "react-icons/fa";
import { FaArrowTrendDown } from "react-icons/fa6";

function Expense() {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const categories = [
    "All",
    ...new Set(expenses.map((expense) => expense.category)),
  ];
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || expense.category === selectedCategory;

    return matchesSearch && matchesCategory;
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
