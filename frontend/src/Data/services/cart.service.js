import { getCartAPI, updateCartAPI } from "../api";

export const updateCartService = async (cartItems) => {
	try {
		const response = await updateCartAPI(cartItems);
		return response.data;
	} catch (error) {
		console.log(error);
		return { error: error.response.data.message };
	}
};

export const getCartService = async () => {
	try {
		const response = await getCartAPI();
		return response.data;
	} catch (error) {
		console.log(error);
		return { error: error.response.data.message };
	}
};
