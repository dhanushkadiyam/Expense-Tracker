import express from "express";
import protect from "../middleware/authMiddleware.js";
import { generateDemoData } from "../controllers/demoController.js";

const router = express.Router();

router.post("/", protect, generateDemoData);

export default router;
