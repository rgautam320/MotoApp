import { getMyOrdersAPI, getOrderDetailsAPI, getStripeKeyAPI, makeOrderAPI, makePaymentAPI } from "../api";

export const getStripeKeyService = async () => {
	try {
		const response = await getStripeKeyAPI();
		return response.data;
	} catch (error) {
		console.log(error);
		return { error: "Unable to get Stripe API Key" };
	}
};

export const makePaymentService = async (amount) => {
	try {
		const response = await makePaymentAPI(amount);
		return response.data;
	} catch (error) {
		console.log(error);
		return { error: error.response.data.message };
	}
};

export const makeOrderService = async (order) => {
	try {
		const response = await makeOrderAPI(order);
		return response.data;
	} catch (error) {
		console.log(error);
		return { error: error.response.data.message };
	}
};

export const getMyOrdersService = async () => {
	try {
		const response = await getMyOrdersAPI();
		return response.data;
	} catch (error) {
		console.log(error);
		return { error: error.response.data.message };
	}
};

export const getOrderDetailsService = async (id) => {
	try {
		const response = await getOrderDetailsAPI(id);
		return response.data;
	} catch (error) {
		console.log(error);
		return { error: error.response.data.message };
	}
};
