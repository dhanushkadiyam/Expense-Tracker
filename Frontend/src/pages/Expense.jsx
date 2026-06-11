import AddExpense from "../components/AddExpense";
import ExpenseList from "../components/ExpenseList";
import { useState } from "react";

function Expense() {
  const [selectedExpense, setSelectedExpense] = useState(null);
  return (
    <div>
      <h1>Expense Page</h1>

      <AddExpense
        selectedExpense={selectedExpense}
      />

      <ExpenseList
        setSelectedExpense={setSelectedExpense}
      />

      
    </div>
  );
}

export default Expense;