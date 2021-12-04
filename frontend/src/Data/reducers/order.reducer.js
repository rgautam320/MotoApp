import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStripeKeyService, makeOrderService, makePaymentService } from "../services/order.service";

const initialState = {
	stripeAPIKey: null,
	order: null,
	loading: false,
	error: null,
	success: null,
};

export const getStripeKey = createAsyncThunk("order/stripeAPIKey", async () => {
	const response = await getStripeKeyService();
	if (response?.error) {
		return { error: response.error };
	}
	return response;
});

export const makePayment = createAsyncThunk("order/makePayment", async (amount) => {
	const response = await makePaymentService(amount);
	if (response?.error) {
		return { error: response.error };
	}
	return response;
});

export const makeOrder = createAsyncThunk("order/makePayment", async (order) => {
	const response = await makeOrderService(order);
	console.log(response);
	if (response?.error) {
		return { error: response.error };
	}
	return response;
});

export const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		setPrice: (state, action) => {
			state.price = action.payload;
		},
		reset: (state, action) => {
			state.success = null;
			state.error = null;
		},
	},
	extraReducers: {
		// Get Stripe Key
		[getStripeKey.pending]: (state, action) => {
			state.loading = true;
		},
		[getStripeKey.fulfilled]: (state, action) => {
			state.stripeAPIKey = action.payload?.stripeApiKey;
			state.loading = false;
		},

		// Make Payment
		[makePayment.pending]: (state, action) => {
			state.loading = true;
		},
		[makePayment.fulfilled]: (state, action) => {
			state.order = action.payload;
			state.loading = false;
			if (action.payload?.error) {
				state.error = action.payload.error;
			} else {
				state.success = action.payload?.message;
			}
		},
	},
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
