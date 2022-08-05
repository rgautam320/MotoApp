import Catch from "../middleware/catch.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// Dashboard Details
export const dashboardDetails = Catch(async (req, res, next) => {
    const countUsers = await User.countDocuments();
    const activeUsers = await User.find({ active: true }).countDocuments();

    const countOrders = await Order.countDocuments();
    const deliveredOrders = await Order.find({ orderStatus: "Delivered" }).countDocuments();

    const countProducts = await Product.countDocuments();
    const outOfStockProducts = await Product.find({ stock: 0 }).countDocuments();

    const earned = await Order.find();
    let amount = 0;
    earned.forEach((ele) => {
        amount += ele.totalPrice;
    });

    const dashboard = {
        user: { total: countUsers, active: activeUsers },
        order: { total: countOrders, delivered: deliveredOrders },
        product: { total: countProducts, outOfStock: outOfStockProducts },
        totalEarned: amount,
    };

    res.status(200).json({ success: true, dashboard: dashboard, message: "Dashboard details Successfully." });
});
