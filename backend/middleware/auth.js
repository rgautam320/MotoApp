import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Catch from "./catch.js";
import ErrorHandler from "./error.js";

export const isAuthenticated = Catch(async (req, res, next) => {
	// const { token } = req.cookies;
	const { token } = req.body;

	if (!token) {
		return next(new ErrorHandler(401, "Unauthorized: Please Login"));
	}

	const decodedData = jwt.verify(token, process.env.JWT_SECRET);

	req.user = await User.findById(decodedData.id);

	next();
});

export const isAdmin = () => {
	return (req, res, next) => {
		if (req.user.role === "user") {
			return next(new ErrorHandler(401, "Unauthorized: You can't access this."));
		}
		next();
	};
};
