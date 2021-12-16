import express from "express";

import { updateCart, getCart } from "../controllers/cartController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// Authenticated User Routes
router.post("/update-cart", isAuthenticated, updateCart);
router.get("/get-cart", isAuthenticated, getCart);

export default router;
