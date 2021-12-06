import { getAllProductsAPI, getFeaturedProductsAPI, getSingleProductAPI, writeReviewAPI } from "../api";

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
