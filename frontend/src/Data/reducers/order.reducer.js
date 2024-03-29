import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    deleteOrderService,
    GetAllOrdersAdminService,
    getMyOrdersService,
    getOrderDetailsService,
    getStripeKeyService,
    makeOrderService,
    makePaymentService,
    updateOrderAdminService,
} from "../services/order.service";

const initialState = {
    stripeAPIKey: null,
    order: null,
    orders: [],
    singleOrder: null,
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
    if (response?.error) {
        return { error: response.error };
    }
    return response;
});

export const getMyOrders = createAsyncThunk("order/getMyOrders", async () => {
    const response = await getMyOrdersService();
    if (response?.error) {
        return { error: response.error };
    }
    return response;
});

export const getOrderDetails = createAsyncThunk("order/getOrderDetails", async (id) => {
    const response = await getOrderDetailsService(id);
    if (response?.error) {
        return { error: response.error };
    }
    return response;
});

export const getAllOrdersAdmin = createAsyncThunk("order/getAddOrdersAdmin", async () => {
    const response = await GetAllOrdersAdminService();
    if (response?.error) {
        return { error: response.error };
    }
    return response;
});

export const deleteOrderAdmin = createAsyncThunk("order/deleteOrder", async (id) => {
    const response = await deleteOrderService(id);
    if (response?.error) {
        return { error: response.error };
    }
    return response;
});

export const updateOrderAdmin = createAsyncThunk("order/deleteOrder", async (payload) => {
    const response = await updateOrderAdminService(payload);
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
            state.order = action.payload?.order;
            state.loading = false;
            if (action.payload?.error) {
                state.error = action.payload.error;
            } else {
                state.success = action.payload?.message;
            }
        },

        // Get My Orders
        [getMyOrders.pending]: (state, action) => {
            state.loading = true;
        },
        [getMyOrders.fulfilled]: (state, action) => {
            state.orders = action.payload?.orders;
            state.loading = false;
            if (action.payload?.error) {
                state.error = action.payload.error;
            }
        },

        // Get Order Details
        [getOrderDetails.pending]: (state, action) => {
            state.loading = true;
        },
        [getOrderDetails.fulfilled]: (state, action) => {
            state.singleOrder = action.payload?.order;
            state.loading = false;
            if (action.payload?.error) {
                state.error = action.payload.error;
            }
        },

        // Get Orders by Admin
        [getAllOrdersAdmin.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllOrdersAdmin.fulfilled]: (state, action) => {
            state.allOrders = action.payload?.orders;
            state.loading = false;
            if (action.payload?.error) {
                state.error = action.payload.error;
            }
        },

        // Delete Order
        [deleteOrderAdmin.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteOrderAdmin.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload?.error) {
                state.error = action.payload.error;
            } else {
                state.success = action.payload?.message;
            }
        },

        // Update Order
        [updateOrderAdmin.pending]: (state, action) => {
            state.loading = true;
        },
        [updateOrderAdmin.fulfilled]: (state, action) => {
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
