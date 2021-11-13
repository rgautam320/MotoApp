import Product from "../models/productModel.js";
import ErrorHandler from "../middleware/error.js";
import Catch from "../middleware/catch.js";
import ProductFeature from "../features/productFeature.js";

// Getting all products - Public
export const getAllProducts = Catch(async (req, res) => {
	const page = 6;
	const productCount = await Product.countDocuments();
	const Products = new ProductFeature(Product.find(), req.query).search().filter().pagination(page);
	const products = await Products.query;
	res.status(200).json({ success: true, products: products, productsCount: productCount, page: page });
});

// Getting Featured Products - Public
export const getFeaturedProducts = Catch(async (req, res) => {
	const page = 6;
	const products = await Product.find({ featured: true }).limit(page);
	res.status(200).json({ success: true, message: "Featured Product", featuredProducts: products });
});

// Creating a Product - Admin
export const createProduct = Catch(async (req, res) => {
	req.body.user = req.user.id;
	const data = req.body;

	const product = await Product.create(data);
	res.status(201).json({ success: true, message: "Product Created Successfully.", product: product });
});

// Creating a Product - Admin
export const updateProduct = Catch(async (req, res, next) => {
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
export const deleteProduct = Catch(async (req, res, next) => {
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

// Create and Update Rating
export const createUpdateReview = Catch(async (req, res, next) => {
	const { _id, name } = req.user;
	const { productId } = req.params;
	const { comment, rating } = req.body;

	if (!rating) {
		return next(new ErrorHandler(404, "Rating is Required"));
	}
	if (!productId) {
		return next(new ErrorHandler(404, "No Product Id Given"));
	}

	let product = await Product.findById(productId);

	if (!product) {
		return next(new ErrorHandler(404, "No Product Found"));
	}

	const isReviewed = product.reviews?.find((rev) => rev.user?.toString() === _id.toString());

	if (isReviewed) {
		product.reviews?.forEach((rev) => {
			if (rev.user?.toString() === _id.toString()) {
				rev.comment = comment;
				rev.rating = rating;
			}
		});
	} else {
		product.reviews?.push({ user: _id, name, rating, comment });
	}

	let sum = 0;
	product.reviews?.forEach((rev) => {
		sum += rev.rating;
	});
	product.rating = sum / product.reviews?.length || 1;

	await product.save({ validateBeforeSave: false });

	res.status(200).json({ success: true, message: "Review Added/Modified" });
});

// Get All Reviews
export const getAllReviews = Catch(async (req, res, next) => {
	const { productId } = req.params;
	if (!productId) {
		return next(new ErrorHandler(404, "No Product Id Given"));
	}

	let product = await Product.findById(productId);

	if (!product) {
		return next(new ErrorHandler(404, "No Product Found"));
	}

	res.status(200).json({ success: true, reviews: product.reviews, numOfReviews: product.reviews.length });
});

// Delete a Review
export const deleteReview = Catch(async (req, res, next) => {
	const { id } = req.query;
	const { productId } = req.params;
	if (!productId) {
		return next(new ErrorHandler(404, "No Product Id Given"));
	}

	let product = await Product.findById(productId);

	if (!product) {
		return next(new ErrorHandler(404, "No Product Found"));
	}

	const reviews = product.reviews?.filter((rev) => rev._id.toString() !== id.toString());

	let sum = 0;
	reviews?.forEach((rev) => {
		sum += rev.rating;
	});
	product.rating = sum / reviews?.length || 1;
	product.reviews = reviews;

	await product.save();

	res.status(200).json({ success: true, message: "Review Deleted", reviews: reviews, numOfReviews: reviews?.length });
});
