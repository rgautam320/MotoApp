import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadService, loginService, registerService } from "../services/user.service";

const initialState = {
	user: {},
	isAuthenticated: false,
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
	console.log(response);
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
	if (response?.error) {
		return { error: response.error };
	}
	return response;
});

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
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
	},
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
