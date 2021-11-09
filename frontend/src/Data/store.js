import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/reducers";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
	},
});
