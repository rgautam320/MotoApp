import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductsService, getFeaturedProductsService } from "../services/product.service";

const initialState = {
	products: [],
	featuredProducts: [],
	singleProduct: {},
	productsCount: 0,
	loading: false,
	error: false,
};

export const getAllProducts = createAsyncThunk("product/getAllProducts", async () => {
	const response = await getAllProductsService();
	if (response?.error) {
		return { error: response.error };
	}
	return response;
});

export const getFeaturedProducts = createAsyncThunk("product/getFeaturedProducts", async () => {
	const response = await getFeaturedProductsService();
	if (response?.error) {
		return { error: response.error };
	}
	return response;
});

export const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: {
		// All Products
		[getAllProducts.pending]: (state, action) => {
			state.loading = true;
		},
		[getAllProducts.fulfilled]: (state, action) => {
			state.products = action.payload.products;
			state.productsCount = action.payload?.productsCount;
			if (action.payload?.error) {
				state.error = action.payload?.error;
			}
			state.loading = false;
		},
		// Featured Products
		[getFeaturedProducts.pending]: (state, action) => {
			state.loading = true;
		},
		[getFeaturedProducts.fulfilled]: (state, action) => {
			state.featuredProducts = action.payload?.featuredProducts;
			if (action.payload?.error) {
				state.error = action.payload.error;
			}
			state.loading = false;
		},
	},
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
