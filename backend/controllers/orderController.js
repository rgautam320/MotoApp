import Catch from "../middleware/catch.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../middleware/error.js";

// Create Order
export const placeOrder = Catch(async (req, res, next) => {
	const { _id } = req.user;
	const { address, orderItems, paymentInfo, paidAt, taxPrice, shippingPrice, totalPrice } = req.body;

	const order = await Order.create({ user: _id, address, orderItems, paymentInfo, paidAt, taxPrice, shippingPrice, totalPrice });
	res.status(200).json({ success: true, message: "Order Placed Successfully", order: order });
});

// Get Single Order
export const getSingleOrder = Catch(async (req, res, next) => {
	const { id } = req.params;
	const order = await Order.findById(id).populate("user", "name email");

	if (!order) {
		return next(new ErrorHandler(404, "Order not found with the given id."));
	}

	res.status(200).json({ success: true, order: order, message: "Order Details Found" });
});

// Get All Orders of particular user
export const getMyAllOrders = Catch(async (req, res, next) => {
	const { _id } = req.user;

	const orders = await Order.find({ user: _id });

	res.status(200).json({ success: true, orders: orders, message: "Orders loaded successfully." });
});

// Get All Orders by Admin
export const getAllOrders = Catch(async (req, res, next) => {
	const orders = await Order.find();

	let totalAmount = 0;

	orders.forEach((order) => {
		totalAmount += order.totalPrice;
	});

	res.status(200).json({ success: true, orders: orders, total: totalAmount });
});

// Update Order Status
export const updateOrderStatus = Catch(async (req, res, next) => {
	const { id } = req.params;
	const { status } = req.body;
	const order = await Order.findById(id);

	if (!status) {
		return next(new ErrorHandler(400, "Order status is required."));
	}

	if (!order) {
		return next(new ErrorHandler(400, "Order not found."));
	}

	if (order.orderStatus === "Delivered") {
		return next(new ErrorHandler(400, "Order has already been delivered."));
	}

	const updateStock = async (id, quantity) => {
		const product = await Product.findById(id);

		product.stock -= quantity;

		await product.save({ validateBeforeSave: false });
	};

	if (status === "Delivered") {
		order.deliveredAt = Date.now();

		order.orderItems.forEach(async (ord) => {
			await updateStock(ord.product, ord.quantity);
		});
	}

	order.orderStatus = status;

	await order.save({ validateBeforeSave: false });

	res.status(200).json({ success: true, order: order });
});

// Delete Order by Admin
export const deleteOrder = Catch(async (req, res, next) => {
	const { id } = req.params;
	const order = await Order.findById(id);

	if (!order) {
		return next(new ErrorHandler(404, "No order found with the given id"));
	}

	await order.remove();

	res.status(200).json({ success: true, message: "Order Deleted Successfully." });
});
