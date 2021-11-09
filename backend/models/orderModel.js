import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
	address: {
		name: { type: String, required: true, default: "Home Address" },
		street: { type: String, required: true },
		city: { type: String, required: true },
		zip: { type: String, required: true },
		state: { type: String, required: true },
		country: { type: String, required: true, default: "India" },
		phone: { type: String, required: true },
	},
	orderItems: [
		{
			name: { type: String, required: true },
			price: { type: String, required: true },
			quantity: { type: Number, required: true },
			image: { type: String, required: true },
			product: { type: mongoose.Schema.ObjectId, required: true, ref: "Product" },
		},
	],
	user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
	paymentInfo: {
		id: { type: String, required: true },
		status: { type: String, required: true, default: "Pending" },
	},
	paidAt: { type: Date, required: true, default: Date.now },
	taxPrice: { type: Number, required: true },
	shippingPrice: { type: Number, required: true },
	totalPrice: { type: Number, required: true },
	orderStatus: { type: String, required: true, default: "Processing" },
	deliveredAt: { type: Date },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
