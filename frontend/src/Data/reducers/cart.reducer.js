import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartService, updateCartService } from "../services/cart.service";

const initialState = {
    loading: false,
    error: null,
    success: null,
    cart: { cartItems: [] },
};

export const updateCart = createAsyncThunk("cart/update-cart", async (payload) => {
    const response = await updateCartService(payload);
    if (response?.error) {
        return { error: response.error };
    }
    return response;
});

export const getCart = createAsyncThunk("cart/get-cart", async () => {
    const response = await getCartService();
    if (response?.error) {
        return { error: response.error };
    }
    return response;
});

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        reset: (state, action) => {
            state.error = null;
            state.success = null;
        },
        resetCartOnly: (state, action) => {
            state.cart = [];
        },
        cart: (state, action) => {
            const isExist = state.cart?.cartItems?.find((item) => item?.product === action.payload?.product);
            if (isExist) {
                state.cart.cartItems = state.cart?.cartItems?.map((item) =>
                    item.product === action.payload?.product ? action.payload : item
                );
            } else {
                state.cart.cartItems = [...state.cart?.cartItems, action.payload];
            }
        },
        cartRemove: (state, action) => {
            state.cart.cartItems = state.cart?.cartItems?.filter((item) => item.product !== action.payload);
        },
    },
    extraReducers: {
        // Get Cart
        [getCart.pending]: (state, action) => {
            state.loading = true;
        },
        [getCart.fulfilled]: (state, action) => {
            state.loading = false;
            state.cart = action.payload?.cart;
            if (action.payload?.error) {
                state.error = action.payload.error;
            }
        },
        // Update Cart
        [updateCart.pending]: (state, action) => {
            state.loading = true;
        },
        [updateCart.fulfilled]: (state, action) => {
            state.loading = false;
            state.cart = action.payload?.cart;
            if (action.payload?.error) {
                state.error = action.payload.error;
            } else {
                state.success = action.payload?.message;
            }
        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
