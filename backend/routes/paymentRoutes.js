import express from "express";
import { processPayment, sendStripeApiKey } from "../controllers/paymentController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/process", isAuthenticated, processPayment);
router.get("/stripeapikey", isAuthenticated, sendStripeApiKey);

export default router;
