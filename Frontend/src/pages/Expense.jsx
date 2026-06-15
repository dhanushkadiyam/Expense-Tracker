import AddExpense from "../components/AddExpense";
import ExpenseList from "../components/ExpenseList";
import { useState } from "react";
import MainLayout from "../components/Layout/MainLayout";

function Expense() {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredExpenses = expenses.filter((expense) =>
    expense.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
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
        <AddExpense
          selectedExpense={selectedExpense}
          setSelectedExpense={setSelectedExpense}
          expenses={expenses}
          setExpenses={setExpenses}
        />

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
