import User from "../models/userModel.js";
import Catch from "../middleware/catch.js";
import ErrorHandler from "../middleware/error.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";

// Register a User
export const registerUser = Catch(async (req, res, next) => {
	const { name, email, password } = req.body;

	if ((!name, !email, !password)) {
		return next(new ErrorHandler(404, "Please Enter Name, Email and Password."));
	}
	const user = await User.create({
		name,
		email,
		password,
		avatar: { public_id: "publicid", url: "url" },
	});

	sendToken(user, 200, res);
});

// Login User
export const loginUser = Catch(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorHandler(404, "Please Enter Email and Password."));
	}

	const user = await User.findOne({ email: email }).select("+password");

	if (!user) {
		return next(new ErrorHandler(401, "Invalid Email or Password."));
	}

	const isPasswordCorrect = await user.comparePassword(password);

	if (!isPasswordCorrect) {
		return next(new ErrorHandler(401, "Invalid Email or Password."));
	}

	sendToken(user, 200, res);
});

// Logout User
export const logout = Catch(async (req, res, next) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({ success: true, message: "Logged Out Successfully." });
});

// Reset Password
export const resetPassword = Catch(async (req, res, next) => {
	const { email } = req.body;
	if (!email) {
		return next(new ErrorHandler(401, "Please Enter Email Address."));
	}

	const user = await User.findOne({ email: email });
	if (!user) {
		return next(new ErrorHandler(401, "User not Found."));
	}
	await user.save({ validateBeforeSave: false });

	const resetToken = user.generatePasswordResetToken();

	const url = `${req.protocol}://${req.get("host")}/api/password/reset/${resetToken}`;
	const message = `Your Password Reset Token is :- ${url}`;

	try {
		await sendEmail({
			email: email,
			subject: "E-Shoppy ",
			message: message,
		});
		res.status(200).json({ success: true, message: `Email sent to ${email} successfully.` });
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });
		return next(new ErrorHandler(500, error.message));
	}
});
