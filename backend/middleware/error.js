class ErrorHandler extends Error {
	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;

		Error.captureStackTrace(this, this.constructor);
	}
}

export const Handler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal Server Error";

	// Handling MongoDB Error
	if (err.name === "CastError") {
		const message = `Cast Error: Resource Not Found. Invalid: ${err.path}`;
		err = new ErrorHandler(404, message);
	}

	// Mongoose Duplicate Key Error
	if (err.code === 11000) {
		const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
		err = new ErrorHandler(400, message);
	}

	// Wrong JWT Error
	if (err.name === "JsonWebTokenError") {
		const message = `Json Web Token is invalid, Try again `;
		err = new ErrorHandler(400, message);
	}

	// JWT EXPIRE Error
	if (err.name === "TokenExpiredError") {
		const message = `Json Web Token is Expired, Try again `;
		err = new ErrorHandler(400, message);
	}

	res.status(err.statusCode).json({
		success: false,
		message: err.message,
	});
};

export default ErrorHandler;
