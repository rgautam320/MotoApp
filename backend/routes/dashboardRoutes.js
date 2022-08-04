import express from "express";
import { dashboardDetails } from "../controllers/dashboardController.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// User Routes
router.get("/get", isAuthenticated, isAdmin(), dashboardDetails);

export default router;
