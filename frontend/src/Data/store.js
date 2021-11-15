import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/product.reducer";
import userReducer from "./reducers/user.reducer";

const store = configureStore({
	reducer: {
		product: productReducer,
		user: userReducer,
	},
});

export default store;
