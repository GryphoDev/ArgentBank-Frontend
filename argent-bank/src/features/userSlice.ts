import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserData {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

interface LoginResponse {
  token: string;
}

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData: UserData): Promise<LoginResponse> => {
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      userData
    );
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null as LoginResponse | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.user = action.payload; // Stocke le token
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default userSlice.reducer;
