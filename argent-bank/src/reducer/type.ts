export type UserData = {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
};

export type LoginResponse = {
  status: number;
  message: string;
  body: { token: string };
};

export type UserInfoResponse = {
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

export type EditUsernamePayload = {
  username: string;
  token: string;
};

export type InitialStateType = {
  authInfo: LoginResponse | null;
  userDetails: UserInfoResponse | null;
  loading: boolean;
  error: string | null;
};
