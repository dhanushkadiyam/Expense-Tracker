import express from "express";

import { deleteAccount } from "../controllers/userController.js";

import {
  updateProfile,
  changePassword,
  updateBudget,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/profile", protect, updateProfile);
router.put("/budget", protect, updateBudget);
router.put("/change-password", protect, changePassword);
router.delete("/delete-account", protect, deleteAccount);

export default router;
