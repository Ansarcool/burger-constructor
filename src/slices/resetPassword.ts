import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  forgotPassword,
  resetPassword,
  TResetPassword,
  type TUser,
  TUserEmail
} from '@api';

export const forgotPasswordThunk = createAsyncThunk(
  'auth/forgotPassword',
  (data: TUserEmail) => forgotPassword(data)
);
export const resetPasswordThunk = createAsyncThunk(
  'auth/resetPassword',
  (data: TResetPassword) => resetPassword(data)
);
type ResetPasswordState = {
  success: boolean;
};

const initialState: ResetPasswordState = {
  success: false
};

export const passwordSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.success = false;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state) => {
        state.success = true;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.success = false;
      });
  }
});
export default passwordSlice.reducer;
