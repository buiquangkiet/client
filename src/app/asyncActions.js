import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetCategory } from "../apis/app";

export const getCategories = createAsyncThunk(
    "app/categories",
    async (data, { rejectWithValue }) => {
        // Gọi lên API backend
        const response = await apiGetCategory();
        // Nếu bị lỗi thì reject
        if (!response.success) {
            return rejectWithValue(response);
        }
        // Còn không thì trả về dữ liệu
        return response.response;
    }
);
