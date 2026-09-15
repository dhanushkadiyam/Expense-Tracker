import Expense from "../models/Expense.js";
export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date, paymentMethod, notes } = req.body;

    const userId = req.user.userId;

    const numericAmount = Number(amount);

    if (
      !title ||
      !category ||
      !date ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0 ||
      Number.isNaN(new Date(date).getTime())
    ) {
      return res.status(400).json({
        message: "Provide a valid title, category, date, and positive amount",
      });
    }

    const expense = await Expense.create({
      userId,
      title,
      amount: numericAmount,
      category,
      date,
      paymentMethod,
      notes,
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
    const { title, amount, category, date, paymentMethod, notes } = req.body;
    const numericAmount = Number(amount);

    if (
      !title ||
      !category ||
      !date ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0 ||
      Number.isNaN(new Date(date).getTime())
    ) {
      return res.status(400).json({
        message: "Provide a valid title, category, date, and positive amount",
      });
    }

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
    expense.amount = numericAmount;
    expense.category = category;
    expense.date = date;
    expense.paymentMethod = paymentMethod;
    expense.notes = notes;

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
