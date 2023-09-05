import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { appSlice } from "./appSlice";
import { modelSlice } from "./ProductModel";
import storage from "redux-persist/lib/storage";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import { userSlice } from "./user/userSlice";
import { breadcrumbSlice } from "./breadcrumbSlice";
import { productSlice } from "./productSlice";

const commonConfig = {
    key: "user",
    storage,
};
const userConfig = {
    ...commonConfig,
    whitelist: ["isLoggedIn", "token"],
};
const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        model: modelSlice.reducer,
        breadcrumb: breadcrumbSlice.reducer,
        user: persistReducer(userConfig, userSlice.reducer),
        product: productSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});
export const persistor = persistStore(store);
export { store };
