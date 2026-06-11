import Income from "../models/Income.js";

export const addIncome = async (req, res) => {
    try {

        const { title, amount, category, date } = req.body;

        const userId = req.user.userId;

        if (!title || !amount || !category || !date) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const income = await Income.create({
            userId,
            title,
            amount,
            category,
            date
        });

        res.status(201).json({
            message: "Income added successfully",
            income
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getIncome = async (req, res) => {
    try {

        const userId = req.user.userId;

        const income = await Income.find({ userId });

        res.status(200).json(income);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const deleteIncome = async (req, res) => {
    try {

        const incomeId = req.params.id;

        const income = await Income.findById(incomeId);

        if (!income) {
            return res.status(404).json({
                message: "Income not found"
            });
        }

        if (income.userId.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        await income.deleteOne();

        res.status(200).json({
            message: "Income deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const updateIncome = async (req, res) => {
    try {

        const incomeId = req.params.id;

        const { title, amount, category, date } = req.body;

        const income = await Income.findById(incomeId);

        if (!income) {
            return res.status(404).json({
                message: "Income not found"
            });
        }

        if (income.userId.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        income.title = title;
        income.amount = amount;
        income.category = category;
        income.date = date;

        await income.save();

        res.status(200).json({
            message: "Income updated successfully",
            income
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};