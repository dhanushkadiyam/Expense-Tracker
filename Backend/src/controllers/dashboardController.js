import Income from "../models/Income.js";
import Expense from "../models/Expense.js";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.userId;

    const incomes = await Income.find({ userId });
    const expenses = await Expense.find({ userId });

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    let monthlyIncome = 0;

    for (const income of incomes) {
      const incomeDate = new Date(income.date);

      if (
        incomeDate.getMonth() === currentMonth &&
        incomeDate.getFullYear() === currentYear
      ) {
        monthlyIncome += income.amount;
      }
    }
    let monthlyExpense = 0;

    for (const expense of expenses) {
      const expenseDate = new Date(expense.date);

      if (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      ) {
        monthlyExpense += expense.amount;
      }
    }
    const monthlyNet = monthlyIncome - monthlyExpense;
    let totalIncome = 0;

    for (const income of incomes) {
      totalIncome += income.amount;
    }

    let totalExpense = 0;

    for (const expense of expenses) {
      totalExpense += expense.amount;
    }

    const balance = totalIncome - totalExpense;

    const recentIncome = await Income.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const recentExpenses = await Expense.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance,
      
      monthlyIncome,
      monthlyExpense,
      monthlyNet,

      recentIncome,
      recentExpenses,

      allIncome: incomes,
      allExpenses: expenses,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
