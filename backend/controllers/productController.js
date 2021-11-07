import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import Catch from "../middleware/catch.js";
import ProductFeature from "../features/productFeature.js";

// Getting all products - Public
export const getAllProducts = Catch(async (req, res) => {
	const page = 4;
	const productCount = await Product.countDocuments();
	const Products = new ProductFeature(Product.find(), req.query).search().filter().pagination(page);
	const products = await Products.query;
	res.status(200).json({ success: true, products: products, productsCount: productCount });
});

// Creating a Product - Admin
export const createProduct = Catch(async (req, res) => {
	const data = req.body;

	const product = await Product.create(data);
	res.status(201).json({ success: true, message: "Product Created Successfully.", product: product });
});

// Creating a Product - Admin
export const updateProduct = Catch(async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	const product = await Product.findById(id);

	if (!product) {
		return next(new ErrorHandler(404, "Product not found"));
	}

	const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true, useFindAndModify: false });
	res.status(200).json({ success: true, message: "Product Updated", product: updateProduct });
});

// Creating a Product - Admin
export const deleteProduct = Catch(async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);

	if (!product) {
		return next(new ErrorHandler(404, "Product not found"));
	}

	await Product.findByIdAndDelete(id);
	res.status(200).json({ message: "Product Deleted Successfully." });
});

// Creating a Product - Public
export const getSingleProduct = Catch(async (req, res, next) => {
	const { id } = req.params;
	const product = await Product.findById(id);

	if (!product) {
		return next(new ErrorHandler(404, "Product not found"));
	}

	res.status(200).json({ success: true, message: "Product Found.", product: product });
});
