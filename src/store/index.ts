import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import modalReducer from "./modal";
import uiReducer from "./ui";
import { useReducer } from "react";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    modal: modalReducer,
    user: useReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
