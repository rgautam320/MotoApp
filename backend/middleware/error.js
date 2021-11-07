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
	console.log(err);
	res.status(err.statusCode).json({
		success: false,
		message: err.message,
	});
};

export default ErrorHandler;
