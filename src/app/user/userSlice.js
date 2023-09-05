import { createSlice } from "@reduxjs/toolkit";
import { getCurrent } from "./asyncAction";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        currentUser: null,
        token: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.token = null;
            state.currentUser = null;
        },
        updateCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrent.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });
        // Khi thực hiện action login thành công (Promise fulfilled)
        builder.addCase(getCurrent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
            state.isLoggedIn = true;
        });
        // Khi thực hiện action login thất bại (Promise rejected)
        builder.addCase(getCurrent.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
            state.errorMessage = action.payload.message;
            state.isLoggedIn = false;
            state.token = null;
        });
    },
});
export const { login, logout, updateCurrentUser } = userSlice.actions;
