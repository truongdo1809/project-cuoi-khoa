import { configureStore } from "@reduxjs/toolkit";
import AuthSlice, { AuthReducer } from "./AuthSlice";

export const store = configureStore({
  reducer: {
    [AuthSlice.name]:AuthReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
