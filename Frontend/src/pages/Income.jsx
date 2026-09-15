import { useState } from "react";
import AddIncome from "../components/AddIncome";
import IncomeList from "../components/IncomeList";
import MainLayout from "../components/Layout/MainLayout";
import "./IncExpCommon.css";
import ExportCSVButton from "../components/ExportCSVButton";
import ExportPDFButton from "../components/ExportPDFButton";
import { FaList, FaEye, FaMoneyBillWave } from "react-icons/fa";
import { paymentMethods } from "../constants/transactionPresets";

function Income() {
  const [incomes, setIncomes] = useState([]);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  const categories = [
    "All",
    ...new Set(incomes.map((income) => income.category)),
  ];
  const filteredIncomes = incomes
    .filter((income) => {
      const matchesSearch = income.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || income.category === selectedCategory;
      const incomeDate = income.date.split("T")[0];
      const matchesDateFrom = !dateFrom || incomeDate >= dateFrom;
      const matchesDateTo = !dateTo || incomeDate <= dateTo;
      const matchesMinAmount = !minAmount || income.amount >= Number(minAmount);
      const matchesMaxAmount = !maxAmount || income.amount <= Number(maxAmount);
      const matchesPaymentMethod =
        paymentMethod === "All" ||
        (income.paymentMethod || "Cash") === paymentMethod;

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
            <h1>Income Tracker</h1>
            <p>Manage and review all your income transactions.</p>
          </div>

          <button
            className="primary-btn"
            onClick={() => setShowIncomeModal(true)}
          >
            + Add Income
          </button>
        </div>

        <div className="income-stats">
          <div className="income-stat-card">
            <h4>
              <FaList /> Total Records
            </h4>
            <h2>{incomes.length}</h2>
          </div>

          <div className="income-stat-card">
            <h4>
              <FaEye /> Showing
            </h4>
            <h2>
              {filteredIncomes.length} of {incomes.length}
            </h2>
          </div>

          <div className="income-stat-card">
            <h4>
              <FaMoneyBillWave /> Total Income
            </h4>
            <h2>
              ₹
              {incomes
                .reduce((sum, income) => sum + income.amount, 0)
                .toLocaleString()}
            </h2>
          </div>
        </div>
        <div className="toolbar">
          <input
            className="search-input"
            type="text"
            placeholder="Search income..."
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

          <ExportCSVButton data={filteredIncomes} fileName="income" />

          <ExportPDFButton data={filteredIncomes} fileName="income" />
        </div>

        {showIncomeModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{selectedIncome ? "Edit Income" : "Add Income"}</h2>

                <button
                  onClick={() => setShowIncomeModal(false)}
                  className="close-btn"
                >
                  ✕
                </button>
              </div>

              <AddIncome
                key={(selectedIncome && selectedIncome._id) || "new"}
                incomes={incomes}
                setIncomes={setIncomes}
                selectedIncome={selectedIncome}
                setSelectedIncome={setSelectedIncome}
                setShowIncomeModal={setShowIncomeModal}
              />
            </div>
          </div>
        )}

        <IncomeList
          incomes={filteredIncomes}
          setIncomes={setIncomes}
          setSelectedIncome={setSelectedIncome}
          setShowIncomeModal={setShowIncomeModal}
        />
      </div>
    </MainLayout>
  );
}

export default Income;
