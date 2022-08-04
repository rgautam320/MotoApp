import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createProductService,
    deleteProductService,
    getAllProductsAdminService,
    getAllProductsService,
    getFeaturedProductsService,
    getSingleProductService,
    updateProductService,
    writeReviewService,
} from "../services/product.service";

const initialState = {
    products: [],
    featuredProducts: [],
    singleProduct: {},
    productsCount: 0,
    filteredProductCount: 0,
    page: 1,
    loading: false,
    success: null,
    error: null,
};

export const getAllProducts = createAsyncThunk("product/getAllProducts", async (payload) => {
    const response = await getAllProductsService(
        payload.keyword,
        payload.currentPage,
        payload.price,
        payload.category,
        payload.rating
    );
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

export const writeReview = createAsyncThunk("product/writeReview", async (payload) => {
    const response = await writeReviewService(payload?.id, payload?.comment, payload?.rating);
    if (response?.error) {
        return { error: response.error };
    }
    return response;
});

export const getAllProductsAdmin = createAsyncThunk("product/getAllProductsAdmin", async () => {
    const response = await getAllProductsAdminService();
    if (response?.error) {
        return { error: response.error };
    }
    return response;
});

export const updateProduct = createAsyncThunk("product/update", async (payload) => {
    const response = await updateProductService(payload);
    if (response?.error) {
        return { error: response.error };
    }
    return response;
});

export const deleteProduct = createAsyncThunk("product/delete", async (id) => {
    const response = await deleteProductService(id);
    if (response?.error) {
        return { error: response.error };
    }
    return response;
});

export const createProduct = createAsyncThunk("product/create", async (data) => {
    const response = await createProductService(data);
    if (response?.error) {
        return { error: response.error };
    }
    return response;
});

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        reset: (state, action) => {
            state.success = null;
            state.error = null;
        },
    },
    extraReducers: {
        // All Products
        [getAllProducts.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.products = action.payload.products;
            state.productsCount = action.payload?.productsCount;
            state.page = action.payload?.page;
            state.filteredProductCount = action.payload?.filteredProductCount;
            state.loading = false;

            if (action.payload?.error) {
                state.error = action.payload.error;
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
            }
        },
        // Submit Review
        [writeReview.pending]: (state, action) => {
            state.loading = true;
        },
        [writeReview.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload?.error) {
                state.error = action.payload.error;
            } else {
                state.success = action.payload?.message;
            }
        },

        // Get All Products
        [getAllProductsAdmin.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllProductsAdmin.fulfilled]: (state, action) => {
            state.loading = false;
            state.productsAdmin = action.payload?.products;
            if (action.payload?.error) {
                state.error = action.payload.error;
            }
        },

        // Update Product
        [updateProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [updateProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload?.success;
            if (action.payload?.error) {
                state.error = action.payload.error;
            } else {
                state.success = action.payload?.message;
            }
        },

        // Delete Product
        [deleteProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload?.success;
            if (action.payload?.error) {
                state.error = action.payload.error;
            } else {
                state.success = action.payload?.message;
            }
        },

        // Create Product
        [createProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [createProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload?.success;
            if (action.payload?.error) {
                state.error = action.payload.error;
            } else {
                state.success = action.payload?.message;
            }
        },
    },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
