import express from "express";

import { deleteAccount } from "../controllers/userController.js";

import {
  updateProfile,
  changePassword,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);
router.delete("/delete-account", protect, deleteAccount);

export default router;
