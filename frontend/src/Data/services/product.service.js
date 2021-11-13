import { getAllProductsAPI, getFeaturedProductsAPI, getSingleProductAPI } from "../api";

export const getAllProductsService = async (keyword, page) => {
	try {
		const response = await getAllProductsAPI(keyword, page);
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
