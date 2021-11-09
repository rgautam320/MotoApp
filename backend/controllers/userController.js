import User from "../models/userModel.js";
import Catch from "../middleware/catch.js";
import ErrorHandler from "../middleware/error.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

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

// Forgot Password
export const forgotPassword = Catch(async (req, res, next) => {
	const { email } = req.body;
	if (!email) {
		return next(new ErrorHandler(401, "Please Enter Email Address."));
	}

	const user = await User.findOne({ email: email });
	if (!user) {
		return next(new ErrorHandler(401, "User not Found."));
	}

	const resetToken = await user.generatePasswordResetToken();

	await user.save({ validateBeforeSave: false });

	const url = `${req.protocol}://${req.get("host")}/api/auth/password/reset/${resetToken}`;
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
		await user.save();
		return next(new ErrorHandler(500, error));
	}
});

// Reset Password
export const resetPassword = Catch(async (req, res, next) => {
	const { token } = req.params;
	const { password, confirmPassword } = req.body;

	const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

	const user = await User.findOne({ resetPasswordToken: resetPasswordToken });

	if (!user) {
		return next(new ErrorHandler(400, "Reset Password Token is Invalid or Token has been expired."));
	}

	if (password !== confirmPassword) {
		return next(new ErrorHandler(400, "Passwords don't match."));
	}

	user.password = password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	sendToken(user, 200, res);
});

// Get User Details
export const getUserDetails = Catch(async (req, res, next) => {
	const { _id } = req.user;

	if (!_id) {
		return next(new ErrorHandler(400, "User with given id not found."));
	}
	const user = await User.findById(_id);

	res.status(200).json({ success: true, user: user });
});

// Update Password
export const updatePassword = Catch(async (req, res, next) => {
	const { oldPassword, newPassword, confirmNewPassword } = req.body;
	const { _id } = req.user;

	const user = await User.findById(_id).select("+password");

	if (newPassword === oldPassword) {
		return next(new ErrorHandler(500, "Passwords cannot be same."));
	}

	const isPasswordCorrect = user.comparePassword(oldPassword);

	if (!isPasswordCorrect) {
		return next(new ErrorHandler(500, "Invalid Old Password."));
	}

	if (newPassword !== confirmNewPassword) {
		return next(new ErrorHandler(500, "Passwords don't match."));
	}

	user.password = newPassword;

	await user.save();

	sendToken(user, 200, res);
});

// Update User Info
export const updateUserDetails = Catch(async (req, res, next) => {
	const { _id } = req.user;
	const { name, email, address } = req.body;

	const user = await User.findByIdAndUpdate(_id, { name, email, address }, { new: true, runValidators: true, useFindAndModify: false });

	res.status(200).json({ success: true, message: "User Updated Successfully", user: user });
});

// Get All Users by Admin
export const getAllUsers = Catch(async (req, res, next) => {
	const users = await User.find();
	const numOfUsers = await User.countDocuments();

	res.status(200).json({ success: true, users: users, numOfUsers: numOfUsers });
});

// Get Single User by Admin
export const getSingleUser = Catch(async (req, res, next) => {
	const { id } = req.params;
	const user = await User.findById(id);

	res.status(200).json({ success: true, user: user });
});

// Update User by Admin
export const updateUserByAdmin = Catch(async (req, res, next) => {
	const { id } = req.params;
	const { name, email, role, address } = req.body;

	const user = await User.findByIdAndUpdate(id, { name, email, role, address }, { new: true, runValidators: true, useFindAndModify: false });

	res.status(200).json({ success: true, message: "User Updated Successfully", user: user });
});

// Delete User by Admin
export const deleteUser = Catch(async (req, res, next) => {
	const { id } = req.params;

	const user = User.findById(id);

	if (!user) {
		return next(new ErrorHandler(500, "No user found with the given id"));
	}

	user.remove();

	res.status(200).json({ success: true, message: "User Deleted Successfully" });
});
