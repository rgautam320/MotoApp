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
        required: [true, "Password field is required."],
        minLength: [8, "Password cannot be less than 8 characters"],
        select: false,
    },
    avatar: {
        public_id: { type: String, required: true, default: "id" },
        url: { type: String, required: true, default: "url" },
    },
    cart: { type: Array },
    active: { type: Boolean, required: true, default: false },
    role: { type: String, required: true, default: "user" },
    address: {
        street: { type: String, required: false },
        city: { type: String, required: false },
        zip: { type: String, required: false },
        state: { type: String, required: false },
        country: { type: String, required: false, default: "India" },
        phone: { type: String, required: false },
    },
    resetPasswordToken: String,
    activateToken: String,
    resetPasswordExpire: Date,
    createdAt: { type: Date, default: Date.now },
});

// Saving decrypted password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    } else {
        next();
    }
});

// Creating JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRE_IN,
    });
};

// Comparing password to login
userSchema.methods.comparePassword = async function (enteredPassword) {
    const test = await bcrypt.hash(enteredPassword, 10);
    const result = await bcrypt.compare(enteredPassword, this.password);
    return result;
};

// Generating Password Reset Token
userSchema.methods.generatePasswordResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

// Generating email verification token
userSchema.methods.generateEmailActivationToken = function () {
    const token = crypto.randomBytes(20).toString("hex");
    this.activateToken = crypto.createHash("sha256").update(token).digest("hex");

    return token;
};

export default mongoose.model("User", userSchema);
