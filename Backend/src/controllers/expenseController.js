import Expense from "../models/Expense.js";
export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    const userId = req.user.userId;

    if (!title || !amount || !category || !date) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const expense = await Expense.create({
      userId,
      title,
      amount,
      category,
      date,
    });

    res.status(201).json({
      message: "Expense added successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const userId = req.user.userId;

    const expenses = await Expense.find({ userId });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;

    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    if (expense.userId.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await expense.deleteOne();

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { title, amount, category, date } = req.body;

    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    if (expense.userId.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    expense.title = title;
    expense.amount = amount;
    expense.category = category;
    expense.date = date;

    await expense.save();

    res.status(200).json({
      message: "Expense updated successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
