import express from "express";

import { updateCart } from "../controllers/cartController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// Authenticated User Routes
router.post("/update-cart", isAuthenticated, updateCart);

export default router;
