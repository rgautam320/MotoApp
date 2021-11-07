import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name field is required."],
		maxLength: [30, "Name cannot exceed 30 characters"],
		minLength: [3, "Name cannot be less than 3 characters"],
	},
	email: {
		type: String,
		required: [true, "Email field is required."],
		maxLength: [30, "Email cannot exceed 30 characters"],
		minLength: [5, "Email cannot be less than 5 characters"],
		unique: true,
		validate: [validator.isEmail, "Please enter your email."],
	},
	password: {
		type: String,
		required: [true, "Password field is requreded."],
		minLength: [8, "Password cannot be less than 8 characters"],
		select: false,
	},
	avatar: {
		public_id: { type: String, required: true },
		url: { type: String, required: true },
	},
	role: { type: String, required: true, default: "user" },
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	createdAt: { type: Date, default: Date.now },
});

// Saving decrypted password
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

// Creating JWT Token
userSchema.methods.getJWTToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.EXPIRE_IN,
	});
};

// Comparing password to login
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Generating Password Reset Token
userSchema.methods.generatePasswordResetToken = function () {
	const resetToken = crypto.randomBytes(20).toString("hex");

	this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
	this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

	return resetToken;
};

export default mongoose.model("User", userSchema);
