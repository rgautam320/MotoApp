import Handler from "../utils/ErrorHandler.js";

const ErrorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal Server Error";

	// Handling MongoDB Error
	if (err.name === "CastError") {
		const message = `Cast Error: Resource Not Found. Invalid: ${err.path}`;
		err = new Handler(404, message);
	}

	res.status(err.statusCode).json({
		success: false,
		message: err.message,
	});
};

export default ErrorHandler;
