import express from "express";

import { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct, createUpdateReview, getAllReviews, deleteReview, getFeaturedProducts } from "../controllers/productController.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// User Routes
router.get("/getAllProducts", getAllProducts);
router.get("/getProduct/:id", getSingleProduct);
router.get("/getProductReview/:productId", getAllReviews);
router.get("/getFeaturedProducts", getFeaturedProducts);

// Admin Routes
router.post("/createProduct", isAuthenticated, isAdmin(), createProduct);
router.put("/updateProduct/:id", isAuthenticated, isAdmin(), updateProduct);
router.delete("/deleteProduct/:id", isAuthenticated, isAdmin(), deleteProduct);
router.delete("/deleteReview/:productId", isAuthenticated, isAdmin(), deleteReview);

// Authenticated User Routes
router.put("/review/:productId", isAuthenticated, createUpdateReview);

export default router;
