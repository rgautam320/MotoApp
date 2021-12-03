import { getStripeKeyAPI } from "../api";

export const getStripeKeyService = async () => {
	try {
		const response = await getStripeKeyAPI();
		return response.data;
	} catch (error) {
		console.log(error);
		return { error: "Unable to get Stripe API Key" };
	}
};
