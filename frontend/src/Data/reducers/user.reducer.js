import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { changePasswordService, forgotPasswordService, loadService, loginService, logoutService, registerService, resetPasswordService, updateProfileService } from "../services/user.service";

const initialState = {
	user: null,
	cart: JSON.parse(localStorage.getItem("cart")),
	isAuthenticated: false,
	isUpdated: false,
	loading: undefined,
	success: null,
	error: null,
};

export const login = createAsyncThunk("user/login", async (payload) => {
	const response = await loginService(payload.email, payload.password);

	if (response?.error) {
		return { error: response.error };
	}
	return response;
});

export const register = createAsyncThunk("user/register", async (payload) => {
	const response = await registerService(payload.email, payload.name, payload.avatar, payload.password);
	if (response?.error) {
		return { error: response.error };
	}
	return response;
});

export const load = createAsyncThunk("user/load", async () => {
	const response = await loadService();
	if (response?.error) {
		return { error: response.error };
	}
	return response;
});

export const updateProfile = createAsyncThunk("user/updateProfile", async (payload) => {
	console.log(payload);
	const response = await updateProfileService(payload);
	if (response?.error) {
		return { error: response.error };
	}
	return response;
});

export const changePassword = createAsyncThunk("user/changePassword", async (payload) => {
	const response = await changePasswordService(payload);
	if (response?.error) {
		return { error: response.error };
	}
	return response;
});

export const forgotPassword = createAsyncThunk("user/forgotPassword", async (payload) => {
	const response = await forgotPasswordService(payload);
	if (response?.error) {
		return { error: response.error };
	}
	return response;
});

export const resetPassword = createAsyncThunk("user/resetPassword", async (payload) => {
	const response = await resetPasswordService(payload.token, payload.passwords);
	if (response?.error) {
		return { error: response.error };
	}
	return response;
});

export const logout = createAsyncThunk("user/logout", async () => {
	const response = await logoutService();
	if (response?.error) {
		return { error: response.error };
	}
	localStorage.clear();
	return response;
});

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		reset: (state, action) => {
			state.isUpdated = false;
			state.success = null;
			state.error = null;
		},
		cart: (state, action) => {
			const isExist = state.cart.find((item) => item?.product === action.payload?.product);
			if (isExist) {
				state.cart = state.cart.map((item) => (item.product === action.payload?.product ? action.payload : item));
			} else {
				state.cart = [...state.cart, action.payload];
			}
			localStorage.setItem("cart", JSON.stringify(state.cart));
		},
		cartRemove: (state, action) => {
			state.cart = state.cart.filter((item) => item.product !== action.payload);
			localStorage.setItem("cart", JSON.stringify(state.cart));
		},
	},
	extraReducers: {
		// Login
		[login.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
			state.success = null;
			state.isUpdated = false;
		},
		[login.fulfilled]: (state, action) => {
			state.user = action.payload?.user;
			state.cart = action.payload?.user?.cart;
			state.isAuthenticated = action.payload?.success ? action.payload?.success : false;
			state.loading = false;
			state.isUpdated = action.payload?.success;
			if (action.payload?.error) {
				state.error = action.payload?.error;
			} else {
				state.success = action.payload?.message;
			}
		},

		// Register
		[register.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
			state.success = null;
			state.isUpdated = false;
		},
		[register.fulfilled]: (state, action) => {
			state.user = action.payload?.user;
			state.cart = action.payload?.user?.cart;
			state.isAuthenticated = action.payload?.success ? action.payload?.success : false;
			state.loading = false;
			state.isUpdated = action.payload?.success;
			if (action.payload?.error) {
				state.error = action.payload.error;
			} else {
				state.success = action.payload?.message;
			}
		},

		// Loading
		[load.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
			state.success = null;
			state.isUpdated = false;
		},
		[load.fulfilled]: (state, action) => {
			state.user = action.payload?.user;
			state.cart = action.payload?.user?.cart;
			state.isUpdated = action.payload?.success;
			state.isAuthenticated = action.payload?.success ? action.payload?.success : false;
			state.loading = false;
		},

		// Update Profile
		[updateProfile.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
			state.success = null;
		},
		[updateProfile.fulfilled]: (state, action) => {
			state.user = action.payload?.user;
			state.cart = action.payload?.user?.cart;
			state.loading = false;
			state.isUpdated = action.payload?.success;
			if (action.payload?.error) {
				state.error = action.payload.error;
			} else {
				state.success = action.payload?.message;
			}
		},

		// Change Password
		[changePassword.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
			state.success = null;
			state.isUpdated = false;
		},
		[changePassword.fulfilled]: (state, action) => {
			state.loading = false;
			state.isUpdated = action.payload?.success;
			if (action.payload?.error) {
				state.error = action.payload.error;
			} else if (action.payload?.success) {
				state.success = action.payload?.message;
			}
		},

		// Forgot Password
		[forgotPassword.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
			state.success = null;
			state.isUpdated = false;
		},
		[forgotPassword.fulfilled]: (state, action) => {
			state.loading = false;
			state.isUpdated = action.payload?.success;
			if (action.payload?.error) {
				state.error = action.payload.error;
			} else if (action.payload?.success) {
				state.success = action.payload?.message;
			}
		},

		// Reset Password
		[resetPassword.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
			state.success = null;
			state.isUpdated = false;
		},
		[resetPassword.fulfilled]: (state, action) => {
			state.loading = false;
			state.isUpdated = action.payload?.success;
			if (action.payload?.error) {
				state.error = action.payload.error;
			} else {
				state.success = action.payload?.message;
			}
		},

		// Logout
		[logout.pending]: (state, action) => {
			state.error = null;
			state.error = null;
			state.success = null;
			state.isUpdated = false;
		},
		[logout.fulfilled]: (state, action) => {
			state.user = null;
			state.cart = null;
			state.isAuthenticated = false;
			state.loading = false;
			state.isUpdated = action.payload?.success;
			if (action.payload?.error) {
				state.error = action.payload.error;
			} else {
				state.success = action.payload?.message;
			}
		},
	},
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
