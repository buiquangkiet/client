import { createSlice } from "@reduxjs/toolkit";

export const modelSlice = createSlice({
    name: "model",
    initialState: {
        isShow: false,
        product: null,
    },
    reducers: {
        setModel(state, action) {
            state.isShow = true;
            state.product = action.payload.product;
            return state;
        },
        offModel(state, action){
            state.isShow = false;
            state.product = null;
            return state;
        }
    },
});

export const { setModel, offModel } = modelSlice.actions;
