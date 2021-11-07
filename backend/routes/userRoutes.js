import express from "express";

import { registerUser, loginUser, logout, resetPassword } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.post("/password/reset", resetPassword);

export default router;
