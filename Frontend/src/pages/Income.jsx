import { useState } from "react";
import AddIncome from "../components/AddIncome";
import IncomeList from "../components/IncomeList";
import MainLayout from "../components/Layout/MainLayout";
import "./IncExpCommon.css";

function Income() {
  const [incomes, setIncomes] = useState([]);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(incomes.map((income) => income.category)),
  ];
  const filteredIncomes = incomes.filter((income) => {
    const matchesSearch = income.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || income.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
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
