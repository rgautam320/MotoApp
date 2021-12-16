import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/product.reducer";
import userReducer from "./reducers/user.reducer";
import orderReducer from "./reducers/order.reducer";
import contactReducer from "./reducers/contact.reducer";
import cartReducer from "./reducers/cart.reducer";

const store = configureStore({
	reducer: {
		product: productReducer,
		user: userReducer,
		order: orderReducer,
		contact: contactReducer,
		cart: cartReducer,
	},
});

export default store;
