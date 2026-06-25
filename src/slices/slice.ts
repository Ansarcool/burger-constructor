import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUser,
  register,
  login,
  type TRegisterUser,
  type TUser,
  type TLogin
} from '@api';

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
type AuthState = {
  user?: TUser;
  loading: boolean;
  error?: string;
};

const initialState: AuthState = {
  loading: false
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
        state.user = undefined;
        state.error = undefined;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerThunk.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка';
      })
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.user = undefined;
        state.error = undefined;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginThunk.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка';
      })

      .addCase(getUserThunk.pending, (state) => {
        state.loading = true;
        state.user = undefined;
        state.error = undefined;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка';
      });
  }
});

export const logout = authSlice.actions.logout;
export default authSlice.reducer;
