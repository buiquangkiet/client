import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        detailProduct: null,
    },
    reducers: {
        setDetail: (state, action) => {
            state.detailProduct = action.payload;
        },
    },
});
export const { setDetail } = productSlice.actions;
