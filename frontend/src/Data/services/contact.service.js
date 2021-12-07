import { sendMessageAPI } from "../api";

export const sendMessageService = async (fullname, email, phone, message) => {
	try {
		const response = await sendMessageAPI(fullname, email, phone, message);
		return response.data;
	} catch (error) {
		console.log(error);
		return { error: "Unable to send message" };
	}
};
