import { loadAPI, loginAPI, logoutAPI, registerAPI } from "../api";

export const loginService = async (email, password) => {
	try {
		const response = await loginAPI(email, password);
		return response.data;
	} catch (error) {
		console.log(error);
		return { error: error.response.data.message };
	}
};

export const registerService = async (email, name, avatar, password) => {
	try {
		const response = await registerAPI(email, name, avatar, password);
		return response.data;
	} catch (error) {
		console.log(error);
		return { error: error.response.data.message };
	}
};

export const loadService = async () => {
	try {
		const response = await loadAPI();
		return response.data;
	} catch (error) {
		console.log(error);
		return { error: error.response.data.message };
	}
};

export const logoutService = async () => {
	try {
		const response = await logoutAPI();
		return response.data;
	} catch (error) {
		console.log(error);
		return { error: error.response.data.message };
	}
};
