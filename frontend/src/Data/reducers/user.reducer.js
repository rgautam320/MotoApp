import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    activateAccountService,
    changePasswordService,
    deleteUserAdminService,
    forgotPasswordService,
    getAllUsersAdminService,
    getDashboardDetailsService,
    loadService,
    loginService,
    logoutService,
    registerService,
    resetPasswordService,
    updateProfileService,
    updateUserAdminService,
} from "../services/user.service";

const initialState = {
    user: null,
    isAuthenticated: null,
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
    localStorage.setItem("TOKEN", response.token);
    return response;
});

export const register = createAsyncThunk("user/register", async (payload) => {
    const response = await registerService(payload.email, payload.name, payload.avatar, payload.password);
    if (response?.error) {
        return { error: response.error };
    }
    return response;
});

export const activate = createAsyncThunk("user/activate", async (token) => {
    const response = await activateAccountService(token);
    if (response?.error) {
        return { error: response?.error };
    }

    localStorage.setItem("TOKEN", response.token);
    return response;
});

export const load = createAsyncThunk("user/load", async () => {
    const response = await loadService();
    if (response?.error) {
        return { error: response.error };
    }

    if (response.token) {
        localStorage.setItem("TOKEN", response.token);
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

    localStorage.setItem("TOKEN", response.token);
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

export const updateUserAdmin = createAsyncThunk("user/update", async (payload) => {
    const response = await updateUserAdminService(payload);
    if (response?.error) {
        return { error: response.error };
    }
    return response;
});

export const deleteUserAdmin = createAsyncThunk("user/delete", async (id) => {
    const response = await deleteUserAdminService(id);
    if (response?.error) {
        return { error: response.error };
    }
    return response;
});

export const getAllUsersAdmin = createAsyncThunk("user/getAllUsers", async () => {
    const response = await getAllUsersAdminService();
    if (response?.error) {
        return { error: response.error };
    }

    return response;
});

export const getDashboardDetails = createAsyncThunk("dashboard/getDashboardDetails", async () => {
    const response = await getDashboardDetailsService();
    if (response?.error) {
        return { error: response.error };
    }
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
            state.isAuthenticated = action.payload?.success ? action.payload?.success : false;
            state.active = action.payload?.user?.active;
            state.loading = false;
            state.isUpdated = action.payload?.success;
            if (action.payload?.error) {
                state.error = action.payload?.error;
            } else {
                state.success = action.payload?.message;
            }
        },
        [activate.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = null;
            state.isUpdated = false;
        },
        [activate.fulfilled]: (state, action) => {
            state.user = action.payload?.user;
            state.isAuthenticated = action.payload?.success ? action.payload?.success : false;
            state.active = action.payload?.user?.active;
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
            state.active = action.payload?.user?.active;
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

        // Get All Users
        [getAllUsersAdmin.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [getAllUsersAdmin.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload?.users;
            if (action.payload?.error) {
                state.error = action.payload.error;
            }
        },

        // Delete User
        [deleteUserAdmin.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = null;
            state.isUpdated = false;
        },
        [deleteUserAdmin.fulfilled]: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload.success;
            if (action.payload?.error) {
                state.error = action.payload.error;
            } else {
                state.success = action.payload?.message;
            }
        },

        // Update User
        [updateUserAdmin.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = null;
            state.isUpdated = false;
        },
        [updateUserAdmin.fulfilled]: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload.success;
            if (action.payload?.error) {
                state.error = action.payload.error;
            } else {
                state.success = action.payload?.message;
            }
        },

        // Dashboard Details
        [getDashboardDetails.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [getDashboardDetails.fulfilled]: (state, action) => {
            state.loading = false;
            state.dashboard = action.payload.dashboard;
            if (action.payload?.error) {
                state.error = action.payload.error;
            }
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
