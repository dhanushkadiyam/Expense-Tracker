import { useEffect } from "react";
import api from "../services/api";
function IncomeList({ incomes, setIncomes, setSelectedIncome }) 
{
    useEffect(() => {

  const fetchIncomes = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get(
        "/income",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response.data);

      setIncomes(response.data);

    } catch (error) {

      console.log(error.response?.data);

    }

  };

  fetchIncomes();

}, [setIncomes]);

const handleDelete = async (incomeId) => {

  try {

    const token = localStorage.getItem("token");

    const response = await api.delete(
      `/income/${incomeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(response.data);
    setIncomes(
    incomes.filter(
        (income) => income._id !== incomeId
    )
    );

  } catch (error) {

    console.log(error.response?.data);

  }

};
  return (
    <div>
      <h2>Income List</h2>
      {
    incomes.map((income) => (
    <div key={income._id}>
      <h3>{income.title}</h3>

      <p>Amount: ₹{income.amount}</p>

      <p>Category: {income.category}</p>

      <p>
        Date: {new Date(income.date).toLocaleDateString()}
      </p>

       <button
         onClick={() => handleDelete(income._id)}
       >
        Delete
      </button>
      <button
        onClick={() => setSelectedIncome(income)}
        >
        Edit
        </button>
      <hr />
    </div>
  ))
  }
    </div>
  );
}

export default IncomeList;