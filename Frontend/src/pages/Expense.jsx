import AddExpense from "../components/AddExpense";
import ExpenseList from "../components/ExpenseList";
import { useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import ExportCSVButton from "../components/ExportCSVButton";
import ExportPDFButton from "../components/ExportPDFButton";

function Expense() {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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
        <h1>Expense Page</h1>
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
        <AddExpense
          selectedExpense={selectedExpense}
          setSelectedExpense={setSelectedExpense}
          expenses={expenses}
          setExpenses={setExpenses}
        />
        <ExportCSVButton data={filteredExpenses} fileName="expenses" />
        <ExportPDFButton data={filteredExpenses} fileName="expenses" />
        <ExpenseList
          expenses={filteredExpenses}
          setExpenses={setExpenses}
          setSelectedExpense={setSelectedExpense}
        />
      </div>
    </MainLayout>
  );
}

export default Expense;
