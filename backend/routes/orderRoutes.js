import express from "express";

import { placeOrder } from "../controllers/orderController.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/order", isAuthenticated, placeOrder);
