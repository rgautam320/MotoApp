import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/product.reducer";
import userReducer from "./reducers/user.reducer";
import orderReducer from "./reducers/order.reducer";

const store = configureStore({
	reducer: {
		product: productReducer,
		user: userReducer,
		order: orderReducer,
	},
});

export default store;
