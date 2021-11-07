import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";

import errorMiddleware from "./middleware/error.js";

import databaseConnection from "./utils/database.js";

const app = express();

// Handling Uncaught Exception
process.on("uncaughtException", (error) => {
	console.log(`Error: ${error.mesage}`);
	console.log(`Shutting down the server due to unhandled Promise Rejection`);

	process.exit(1);
});

// Using bodyParser and cors
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Initializing config file
dotenv.config();

// API Routes
app.use("/api/products", productRoutes);

// Using Error Middleware
app.use(errorMiddleware);

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
