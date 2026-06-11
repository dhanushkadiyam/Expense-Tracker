import express from "express";
import { addIncome, getIncome, deleteIncome, updateIncome } from "../controllers/incomeController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addIncome);
router.get("/", protect, getIncome);
router.delete("/:id", protect, deleteIncome);
router.put("/:id", protect, updateIncome);

export default router;