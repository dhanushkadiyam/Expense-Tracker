import AddExpense from "../components/AddExpense";
import ExpenseList from "../components/ExpenseList";
import { useState } from "react";

function Expense() {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenses, setExpenses] = useState([]);
  return (
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
  );
}

export default Expense;