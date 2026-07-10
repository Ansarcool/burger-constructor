import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUser,
  register,
  login,
  forgotPassword,
  type TRegisterUser,
  type TUser,
  type TLogin,
  type TUserEmail,
  getUserOrders
} from '@api';
import { TOrder } from '@utils-types';
export const registerThunk = createAsyncThunk(
  'auth/register',
  (data: TRegisterUser) => register(data)
);

export const loginThunk = createAsyncThunk('auth/login', (data: TLogin) =>
  login(data)
);

export const getUserThunk = createAsyncThunk(
  'auth/user',
  (accessToken: string) => getUser(accessToken)
);
export const forgotPasswordThunk = createAsyncThunk(
  'auth/forgotPassword',
  (data: TUserEmail) => forgotPassword(data)
);
export const getUserOrdersThunk = createAsyncThunk(
  'auth/getUserOrders',
  (accessToken: string) => getUserOrders(accessToken)
);
type AuthState = {
  user?: TUser | null;
  loading: boolean;
  error?: string;
  passwordResetRequest: boolean;
  userOrders: TOrder[];
};

const initialState: AuthState = {
  loading: false,
  passwordResetRequest: false,
  userOrders: []
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      state.user = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('accessToken', action.payload.access_token);
        localStorage.setItem('refreshToken', action.payload.refresh_token);
      })
      .addCase(registerThunk.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка';
      })
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('accessToken', action.payload.access_token);
        localStorage.setItem('refreshToken', action.payload.refresh_token);
      })
      .addCase(loginThunk.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка';
      })

      .addCase(getUserThunk.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка';
        state.user = null;
      })
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.passwordResetRequest = false;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state) => {
        state.loading = false;
        state.passwordResetRequest = true;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.passwordResetRequest = false;
        state.error = action.error.message;
      })
      .addCase(getUserOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload.orders;
      })
      .addCase(getUserOrdersThunk.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка';
      });
  }
});

export const logout = authSlice.actions.logout;
export default authSlice.reducer;
