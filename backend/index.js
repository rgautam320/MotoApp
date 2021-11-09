import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { Handler } from "./middleware/error.js";

import databaseConnection from "./utils/database.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

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
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/order", orderRoutes);

// Using Error Middleware
app.use(Handler);

// Connecting Database
databaseConnection();

// Starting Server
const server = app.listen(process.env.PORT, () => console.log(`Server Running on Port: ${process.env.PORT}`));

// Handling Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due to unhandled Promise Rejection`);

	server.close(() => process.exit(1));
});
