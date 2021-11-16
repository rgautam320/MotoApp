import { changePasswordAPI, loadAPI, loginAPI, logoutAPI, registerAPI, updateProfileAPI } from "../api";

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

export const updateProfileService = async (info) => {
	try {
		const response = await updateProfileAPI(info);
		return response.data;
	} catch (error) {
		console.log(error);
		return { error: error.response.data.message };
	}
};

export const changePasswordService = async (passwords) => {
	try {
		const response = await changePasswordAPI(passwords);
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
