import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
	cartItems: [
		{
			name: { type: String, required: true },
			price: { type: String, required: true },
			quantity: { type: Number, required: true },
			image: { type: String, required: true },
			product: { type: mongoose.Schema.ObjectId, required: true, ref: "Product" },
		},
	],
	user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Cart", cartSchema);
