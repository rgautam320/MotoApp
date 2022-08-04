import {
    createProductAPI,
    deleteProductAPI,
    getAllProductsAdminAPI,
    getAllProductsAPI,
    getFeaturedProductsAPI,
    getSingleProductAPI,
    updateProductAPI,
    writeReviewAPI,
} from "../api";

export const getAllProductsService = async (keyword, page, price, category, rating) => {
    try {
        const response = await getAllProductsAPI(keyword, page, price, category, rating);
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message };
    }
};

export const getFeaturedProductsService = async () => {
    try {
        const response = await getFeaturedProductsAPI();
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message };
    }
};

export const getSingleProductService = async (id) => {
    try {
        const response = await getSingleProductAPI(id);
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message };
    }
};

export const writeReviewService = async (id, comment, rating) => {
    try {
        const response = await writeReviewAPI(id, comment, rating);
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message };
    }
};

export const getAllProductsAdminService = async () => {
    try {
        const response = await getAllProductsAdminAPI();
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message };
    }
};

export const updateProductService = async (payload) => {
    try {
        const response = await updateProductAPI(payload?.id, payload?.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message };
    }
};

export const deleteProductService = async (id) => {
    try {
        const response = await deleteProductAPI(id);
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message };
    }
};

export const createProductService = async (data) => {
    try {
        const response = await createProductAPI(data);
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message };
    }
};
