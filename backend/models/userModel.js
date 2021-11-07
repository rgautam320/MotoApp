import mongoose from "mongoose";
import validator from "validator";

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
	resetPasswordToken: { type: String },
	resetPasswordExpire: { type: Date },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
