import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendMessageService } from "../services/contact.service";

const initialState = {
	loading: false,
	error: null,
	success: null,
};

export const sendMessage = createAsyncThunk("contact/sendMessage", async (payload) => {
	const response = await sendMessageService(payload?.fullname, payload?.email, payload?.phone, payload?.message);
	if (response?.error) {
		return { error: response.error };
	}
	return response;
});

export const contactSlice = createSlice({
	name: "contact",
	initialState,
	reducers: {
		reset: (state, action) => {
			state.error = null;
			state.success = null;
		},
	},
	extraReducers: {
		// Send Message
		[sendMessage.pending]: (state, action) => {
			state.loading = true;
		},
		[sendMessage.fulfilled]: (state, action) => {
			state.loading = false;
			if (action.payload?.error) {
				state.error = action.payload.error;
			} else {
				state.success = action.payload?.message;
			}
		},
	},
});

export const contactActions = contactSlice.actions;

export default contactSlice.reducer;
