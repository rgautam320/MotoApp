import Catch from "../middleware/catch.js";
import Cart from "../models/cartModel.js";
import ErrorHandler from "../middleware/error.js";

// Add Items
export const updateCart = Catch(async (req, res, next) => {
	const { _id } = req.user;
	const { cartItems } = req.body;

	const my_cart = await Cart.findOne({ user: _id });

	if (!my_cart) {
		return next(new ErrorHandler(500, "No cart found."));
	}

	const cart = await Cart.findByIdAndUpdate(my_cart._id, { cartItems }, { new: true, runValidators: true, useFindAndModify: false });
	res.status(200).json({ success: true, cart: cart, message: "Cart Updated Successfully." });
});
