import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type UserData = {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
};

type LoginResponse = {
  status: number;
  message: string;
  body: { token: string };
};

type UserInfoResponse = {
  status: number;
  message: string;
  body: {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
};

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

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (token: string): Promise<UserInfoResponse> => {
    const response = await axios.get(
      "http://localhost:3001/api/v1/user/profile",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(response.data);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    authenticate: false,
    authInfo: null as LoginResponse | null,
    userDetails: null as UserInfoResponse | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setAuthenticate: (state, action: PayloadAction<boolean>) => {
      state.authenticate = action.payload;
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
      });
  },
});

export const { setAuthenticate } = userSlice.actions;
export default userSlice.reducer;
