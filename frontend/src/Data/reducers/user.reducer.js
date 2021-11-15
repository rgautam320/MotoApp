import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadService, loginService, registerService } from "../services/user.service";

const initialState = {
	user: {},
	isAuthenticated: false,
	loading: false,
	error: false,
};

export const login = createAsyncThunk("user/login", async (payload) => {
	const response = await loginService(payload.email, payload.password);
	console.log(response);
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
	if (response?.error) {
		return { error: response.error };
	}
	return response;
});

export const load = createAsyncThunk("user/load", async () => {
	const response = await loadService();
	console.log(response);
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
		},
		[login.fulfilled]: (state, action) => {
			state.user = action.payload?.user;
			state.isAuthenticated = action.payload?.success;
			state.loading = false;
			if (action.payload?.error) {
				state.error = action.payload.error;
			}
		},

		// Register
		[register.pending]: (state, action) => {
			state.loading = true;
		},
		[register.fulfilled]: (state, action) => {
			state.user = action.payload?.user;
			state.isAuthenticated = action.payload?.status;
			state.loading = false;
			if (action.payload?.error) {
				state.error = action.payload.error;
			}
		},

		// Register
		[load.pending]: (state, action) => {
			state.loading = true;
		},
		[load.fulfilled]: (state, action) => {
			state.user = action.payload?.user;
			state.isAuthenticated = action.payload?.status;
			state.loading = false;
			if (action.payload?.error) {
				state.error = action.payload.error;
			}
		},
	},
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
