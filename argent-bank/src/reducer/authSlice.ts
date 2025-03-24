import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserData, LoginResponse, InitialAuthStateType } from "./type";

const url = "http://localhost:3001/api/v1/user";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: UserData): Promise<LoginResponse> => {
    const response = await axios.post(`${url}/login`, userData);
    return response.data;
  }
);

const initialState: InitialAuthStateType = {
  isAuthenticated: false,
  authInfo: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      state.authInfo = null;
      state.isAuthenticated = false;
    },
    isAuthenticate: (state) => {
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authInfo = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { logout, isAuthenticate } = authSlice.actions;
export default authSlice.reducer;
