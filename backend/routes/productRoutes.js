import express from "express";

import { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct } from "../controllers/productController.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/getAllProducts", getAllProducts);
router.post("/createProduct", isAuthenticated, isAdmin(), createProduct);
router.put("/updateProduct/:id", isAuthenticated, isAdmin(), updateProduct);
router.delete("/deleteProduct/:id", isAuthenticated, isAdmin(), deleteProduct);
router.get("/getProduct/:id", getSingleProduct);

export default router;
