import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { logout } from "./authSlice";
import axios from "axios";
import {
  UserInfoResponse,
  EditUsernamePayload,
  InitialUserStateType,
} from "./type";

const url = "http://localhost:3001/api/v1/user";

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (token: string): Promise<UserInfoResponse> => {
    const response = await axios.get(`${url}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const editUsername = createAsyncThunk(
  "user/editUsername",
  async ({
    username,
    token,
  }: EditUsernamePayload): Promise<UserInfoResponse> => {
    const response = await axios.put(
      `${url}/profile`,
      { userName: username },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

const initialState: InitialUserStateType = {
  userDetails: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUserInfo.fulfilled,
        (state, action: PayloadAction<UserInfoResponse>) => {
          state.loading = false;
          state.userDetails = action.payload;
        }
      )
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "An error occurred while fetching user details";
      })
      .addCase(editUsername.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        editUsername.fulfilled,
        (state, action: PayloadAction<UserInfoResponse>) => {
          state.loading = false;
          state.userDetails = action.payload;
        }
      )
      .addCase(editUsername.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "An error occurred while editing username";
      })
      .addCase(logout, (state) => {
        state.userDetails = null;
      });
  },
});

export default userSlice.reducer;
