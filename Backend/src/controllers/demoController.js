import Expense from "../models/Expense.js";
import Income from "../models/Income.js";
import User from "../models/User.js";

export const generateDemoData = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.demoDataCreatedAt) {
      return res.status(409).json({
        message: "Demo data has already been generated for this account",
      });
    }

    const userId = user._id;
    const now = new Date();
    const sampleDate = (daysAgo) => {
      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);
      return date;
    };

    await Income.insertMany([
      {
        userId,
        title: "Monthly salary",
        amount: 65000,
        category: "Salary",
        date: sampleDate(3),
        paymentMethod: "Bank Transfer",
        notes: "Demo income",
      },
      {
        userId,
        title: "Freelance project",
        amount: 12000,
        category: "Freelance",
        date: sampleDate(12),
        paymentMethod: "UPI",
        notes: "Demo income",
      },
    ]);

    await Expense.insertMany([
      {
        userId,
        title: "Rent",
        amount: 22000,
        category: "Housing",
        date: sampleDate(5),
        paymentMethod: "Bank Transfer",
        notes: "Demo expense",
      },
      {
        userId,
        title: "Groceries",
        amount: 4800,
        category: "Food",
        date: sampleDate(8),
        paymentMethod: "Card",
        notes: "Demo expense",
      },
      {
        userId,
        title: "Commute",
        amount: 1800,
        category: "Transport",
        date: sampleDate(15),
        paymentMethod: "UPI",
        notes: "Demo expense",
      },
      {
        userId,
        title: "Streaming subscription",
        amount: 699,
        category: "Entertainment",
        date: sampleDate(20),
        paymentMethod: "Card",
        notes: "Demo expense",
      },
    ]);

    user.demoDataCreatedAt = now;
    await user.save();

    res.status(201).json({
      message: "Demo data generated successfully",
      created: { income: 2, expenses: 4 },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
