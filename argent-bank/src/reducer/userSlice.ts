import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  UserData,
  LoginResponse,
  UserInfoResponse,
  EditUsernamePayload,
  InitialStateType,
} from "./type";

const url = "http://localhost:3001/api/v1/user";

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData: UserData): Promise<LoginResponse> => {
    const response = await axios.post(`${url}/login`, userData);
    return response.data;
  }
);

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

const initialState: InitialStateType = {
  authInfo: null,
  userDetails: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.authInfo = null;
      state.userDetails = null;
    },
  },
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
          state.authInfo = action.payload;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })

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
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
