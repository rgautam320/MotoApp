import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";

import { Handler } from "./middleware/error.js";

import databaseConnection from "./utils/database.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

// Initializing config file
dotenv.config();

// Handling Uncaught Exception
process.on("uncaughtException", (error) => {
	console.log(`Error: ${error.mesage}`);
	console.log(`Shutting down the server due to unhandled Promise Rejection`);

	process.exit(1);
});

// Using bodyParser, cors, cookieParser etc.
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/contact", contactRoutes);

// Using Error Middleware
app.use(Handler);

// Connecting Database
databaseConnection();

// Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Starting Server
const server = app.listen(process.env.PORT, () => console.log(`Server Running on Port: ${process.env.PORT}`));

// Handling Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due to unhandled Promise Rejection`);

	server.close(() => process.exit(1));
});
