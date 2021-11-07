import express from "express";

import { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/getAllProducts", getAllProducts);
router.post("/createProduct", createProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/getProduct/:id", getSingleProduct);

export default router;
