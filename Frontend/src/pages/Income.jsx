import { useState } from "react";
import AddIncome from "../components/AddIncome";
import IncomeList from "../components/IncomeList";

function Income() {
  const [incomes, setIncomes] = useState([]);
  const [selectedIncome, setSelectedIncome] = useState(null);
  return (
    <div>
      <h1>Income Page</h1>

      <AddIncome
        incomes={incomes}
        setIncomes={setIncomes}
        selectedIncome={selectedIncome}
        setSelectedIncome={setSelectedIncome}
      />
      <IncomeList
        incomes={incomes}
        setIncomes={setIncomes}
        setSelectedIncome={setSelectedIncome}
      />
      
    </div>
  );
}

export default Income;