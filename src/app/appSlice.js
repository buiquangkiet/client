import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./asyncActions";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        isLoading: false,
        categories: null,
        width: 0,
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setWidth: (state, action) => {
            state.width = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });

        // Khi thực hiện action login thành công (Promise fulfilled)
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;
        });

        // Khi thực hiện action login thất bại (Promise rejected)
        builder.addCase(getCategories.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
});
export const { setCategories, setLoading, setWidth } = appSlice.actions;
