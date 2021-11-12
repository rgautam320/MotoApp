import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	name: { type: String, required: [true, "Please Enter Product Name"] },
	category: { type: String, required: [true, "Please Enter Product Category"] },
	description: { type: String, required: [true, "Please Enter Product Description"] },
	price: { type: Number, required: [true, "Please Enter Product Price"], maxlength: [6, "Price shouldn't exceed 6 characters."] },
	images: [
		{
			public_id: { type: String, required: true },
			url: { type: String, required: true },
		},
	],
	rating: { type: Number, default: 0 },
	stock: { type: Number, required: [true, "Please Enter Product Stock"], maxLength: [4, "Stock cannot exceed 4 characters"], default: 1 },
	featured: { type: Boolean, default: false },
	reviews: [
		{
			user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
			name: { type: String, required: true },
			rating: { type: Number, required: true },
			comment: { type: String, required: true },
		},
	],
	user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
