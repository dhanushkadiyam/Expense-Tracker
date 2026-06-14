import AddExpense from "../components/AddExpense";
import ExpenseList from "../components/ExpenseList";
import { useState } from "react";
import MainLayout from "../components/Layout/MainLayout";

function Expense() {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenses, setExpenses] = useState([]);
  return (
    <MainLayout>
      <div>
        <h1>Expense Page</h1>

        <AddExpense
          selectedExpense={selectedExpense}
          setSelectedExpense={setSelectedExpense}
          expenses={expenses}
          setExpenses={setExpenses}
        />

        <ExpenseList
          expenses={expenses}
          setExpenses={setExpenses}
          setSelectedExpense={setSelectedExpense}
        />
      </div>
    </MainLayout>
  );
}

export default Expense;
