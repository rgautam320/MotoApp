import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { changePasswordService, loadService, loginService, logoutService, registerService, updateProfileService } from "../services/user.service";

const initialState = {
	user: {},
	isAuthenticated: false,
	isUpdated: false,
	loading: false,
	success: null,
	error: null,
};

export const login = createAsyncThunk("user/login", async (payload) => {
	const response = await loginService(payload.email, payload.password);
	if (response?.token) {
		localStorage.setItem("token", response?.token);
	}
	if (response?.error) {
		return { error: response.error };
	}
	return response;
});

export const register = createAsyncThunk("user/register", async (payload) => {
	const response = await registerService(payload.email, payload.name, payload.avatar, payload.password);
	if (response?.token) {
		localStorage.setItem("token", response?.token);
	}
	if (response?.error) {
		return { error: response.error };
	}
	return response;
});

export const load = createAsyncThunk("user/load", async () => {
	const response = await loadService();
	if (response?.token) {
		localStorage.setItem("token", response?.token);
	}
	if (response?.error) {
		return { error: response.error };
	}
	return response;
});

export const updateProfile = createAsyncThunk("user/updateProfile", async (payload) => {
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
		},
	},
	extraReducers: {
		// Login
		[login.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
			state.success = null;
		},
		[login.fulfilled]: (state, action) => {
			state.user = action.payload?.user;
			state.isAuthenticated = action.payload?.success;
			state.loading = false;
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
		},
		[register.fulfilled]: (state, action) => {
			state.user = action.payload?.user;
			state.isAuthenticated = action.payload?.success;
			state.loading = false;
			if (action.payload?.error) {
				state.error = action.payload.error;
			} else {
				state.success = action.payload?.message;
			}
		},

		// Register
		[load.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
			state.success = null;
		},
		[load.fulfilled]: (state, action) => {
			state.user = action.payload?.user;
			state.isAuthenticated = action.payload?.success;
			state.loading = false;
			if (action.payload?.error) {
				state.error = action.payload.error;
			} else {
				state.success = action.payload?.message;
			}
		},

		// Update Profile
		[updateProfile.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
			state.success = null;
		},
		[updateProfile.fulfilled]: (state, action) => {
			state.user = action.payload?.user;
			state.loading = false;
			state.isUpdated = action.payload?.success;
			if (action.payload?.error) {
				state.error = action.payload.error;
			} else {
				state.success = action.payload?.message;
			}
		},

		// Update Profile
		[changePassword.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
			state.success = null;
			state.isUpdated = false;
		},
		[changePassword.fulfilled]: (state, action) => {
			state.user = action.payload?.user;
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
			state.loading = true;
			state.error = null;
			state.success = null;
			state.isUpdated = false;
		},
		[logout.fulfilled]: (state, action) => {
			state.user = null;
			state.isAuthenticated = false;
			state.loading = false;
			state.success = false;
			if (action.payload?.error) {
				state.error = action.payload.error;
			}
		},
	},
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
