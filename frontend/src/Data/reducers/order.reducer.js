import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStripeKeyService } from "../services/order.service";

const initialState = {
	stripeAPIKey: null,
};

export const getStripeKey = createAsyncThunk("order/stripeAPIKey", async () => {
	const response = await getStripeKeyService();
	if (response?.error) {
		return { error: response.error };
	}
	return response;
});

export const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {},
	extraReducers: {
		// All Products
		[getStripeKey.fulfilled]: (state, action) => {
			state.stripeAPIKey = action.payload?.stripeApiKey;
		},
	},
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
