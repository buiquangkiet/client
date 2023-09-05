import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetCurrent } from "apis/user";

export const getCurrent = createAsyncThunk(
    "user/current",
    async (data, { rejectWithValue }) => {
        // Gọi lên API backend
        const response = await apiGetCurrent();
        // Nếu bị lỗi thì reject
        if (!response.success) {
            return rejectWithValue(response);
        }
        // Còn không thì trả về dữ liệu
        return response.response;
    }
);
