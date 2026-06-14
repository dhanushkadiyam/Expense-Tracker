import { useState } from "react";
import AddIncome from "../components/AddIncome";
import IncomeList from "../components/IncomeList";
import MainLayout from "../components/Layout/MainLayout";

function Income() {
  const [incomes, setIncomes] = useState([]);
  const [selectedIncome, setSelectedIncome] = useState(null);
  return (
    <MainLayout>
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
    </MainLayout>
  );
}

export default Income;
