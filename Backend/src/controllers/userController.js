import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Income from "../models/Income.js";
import Expense from "../models/Expense.js";

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.userId;

    await Income.deleteMany({ userId });

    await Expense.deleteMany({ userId });

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
      },
      { new: true },
    ).select("-password");

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
