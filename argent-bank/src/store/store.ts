import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducer/userSlice";
import authReducer from "../reducer/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
