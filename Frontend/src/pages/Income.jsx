import { useState } from "react";
import AddIncome from "../components/AddIncome";
import IncomeList from "../components/IncomeList";
import MainLayout from "../components/Layout/MainLayout";
import "./IncExpCommon.css";

function Income() {
  const [incomes, setIncomes] = useState([]);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIncomes = incomes.filter((income) =>
    income.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <MainLayout>
      <div>
        <h1>Income Page</h1>
        <input
          className="search-input"
          type="text"
          placeholder="Search income..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <AddIncome
          incomes={incomes}
          setIncomes={setIncomes}
          selectedIncome={selectedIncome}
          setSelectedIncome={setSelectedIncome}
        />
        <IncomeList
          incomes={filteredIncomes}
          setIncomes={setIncomes}
          setSelectedIncome={setSelectedIncome}
        />
      </div>
    </MainLayout>
  );
}

export default Income;
