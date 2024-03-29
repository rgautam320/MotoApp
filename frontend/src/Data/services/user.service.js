import {
    activateAccountAPI,
    changePasswordAPI,
    deleteUserAdminAPI,
    forgotPasswordAPI,
    getAllUsersAdminAPI,
    getDashboardDetailsAPI,
    loadAPI,
    loginAPI,
    logoutAPI,
    registerAPI,
    resetPasswordAPI,
    updateProfileAPI,
    updateUserAdminAPI,
} from "../api";

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

export const activateAccountService = async (token) => {
    try {
        const response = await activateAccountAPI(token);
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

export const forgotPasswordService = async (email) => {
    try {
        const response = await forgotPasswordAPI(email);
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message };
    }
};

export const resetPasswordService = async (token, passwords) => {
    try {
        const response = await resetPasswordAPI(token, passwords);
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

export const getAllUsersAdminService = async () => {
    try {
        const response = await getAllUsersAdminAPI();
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message };
    }
};

export const updateUserAdminService = async (payload) => {
    try {
        const response = await updateUserAdminAPI(payload.id, payload.role);
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message };
    }
};

export const deleteUserAdminService = async (id) => {
    try {
        const response = await deleteUserAdminAPI(id);
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message };
    }
};

export const getDashboardDetailsService = async () => {
    try {
        const response = await getDashboardDetailsAPI();
        return response.data;
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message };
    }
};
