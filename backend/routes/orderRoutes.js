import express from "express";

import { deleteOrder, getAllOrders, getMyAllOrders, getSingleOrder, placeOrder, updateOrderStatus } from "../controllers/orderController.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// Authenticated User Routes
router.post("/placeOrder", isAuthenticated, placeOrder);
router.get("/getAllMyOrders", isAuthenticated, getMyAllOrders);
router.get("/getSingleOrder/:id", isAuthenticated, getSingleOrder);

// Admin Routes
router.get("/getAllOrders", isAuthenticated, isAdmin(), getAllOrders);
router.put("/updateOrder/:id", isAuthenticated, isAdmin(), updateOrderStatus);
router.delete("/deleteOrder/:id", isAuthenticated, isAdmin(), deleteOrder);

export default router;
