import { getAllProductsAPI, getFeaturedProductsAPI } from "../api";

export const getAllProductsService = async () => {
	try {
		const response = await getAllProductsAPI();
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
