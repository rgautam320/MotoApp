import express from "express";

import { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateUserDetails, getAllUsers, getSingleUser, updateUserByAdmin, deleteUser } from "../controllers/userController.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// User Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

// Authenticated Routes
router.get("/me", isAuthenticated, getUserDetails);
router.put("/updatePassword", isAuthenticated, updatePassword);
router.put("/updateUserDetails", isAuthenticated, updateUserDetails);

// Admin Routes
router.get("/admin/getAllUsers", isAuthenticated, isAdmin(), getAllUsers);
router.get("/admin/getSingleUser/:id", isAuthenticated, isAdmin(), getSingleUser);
router.get("/admin/getSingleUser/:id", isAuthenticated, isAdmin(), getSingleUser);
router.put("/admin/updateUser/:id", isAuthenticated, isAdmin(), updateUserByAdmin);
router.delete("/admin/deleteUser/:id", isAuthenticated, isAdmin(), deleteUser);

export default router;
