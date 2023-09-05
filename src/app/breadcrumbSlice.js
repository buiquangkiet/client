import { createSlice } from "@reduxjs/toolkit";

export const breadcrumbSlice = createSlice({
    name: "breadcrumb",
    initialState: {
        paths: [{ title: "Home", path: "/" }],
    },
    reducers: {
        setPaths: (state, action) => {
            state.paths = action.payload;
        },
    },
});
export const { setPaths } = breadcrumbSlice.actions;
