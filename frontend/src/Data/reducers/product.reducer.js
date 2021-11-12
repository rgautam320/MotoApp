import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductsService, getFeaturedProductsService, getSingleProductService } from "../services/product.service";

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

export const getSingleProduct = createAsyncThunk("product/getSingleProduct", async (id) => {
	const response = await getSingleProductService(id);
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
			state.loading = false;

			if (action.payload?.error) {
				state.error = action.payload.error;
				setTimeout(() => {
					state.error = false;
				}, 5000);
			}
		},
		// Featured Products
		[getFeaturedProducts.pending]: (state, action) => {
			state.loading = true;
		},
		[getFeaturedProducts.fulfilled]: (state, action) => {
			state.featuredProducts = action.payload?.featuredProducts;
			state.loading = false;

			if (action.payload?.error) {
				state.error = action.payload.error;
				setTimeout(() => {
					state.error = false;
				}, 5000);
			}
		},
		// Single Product
		[getSingleProduct.pending]: (state, action) => {
			state.loading = true;
		},
		[getSingleProduct.fulfilled]: (state, action) => {
			state.singleProduct = action.payload?.product;
			state.loading = false;

			if (action.payload?.error) {
				state.error = action.payload.error;
				setTimeout(() => {
					state.error = false;
				}, 5000);
			}
		},
	},
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
