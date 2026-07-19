import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrderRequest } from '@api';
import { type TNewOrderResponse } from '@api';

export const createOrderRequestThunk = createAsyncThunk(
  'orders/create',
  (orderData: { ingredients: string[]; token: string }) =>
    createOrderRequest(orderData.ingredients, orderData.token)
);
const initialState: TNewOrderResponse = {
  success: false,
  isLoading: false,
  order: {
    number: 0
  },
  name: ''
};
export const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.success = false;
      state.order.number = 0;
      state.name = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderRequestThunk.pending, (state) => {
        state.success = false;
        state.isLoading = true;
      })
      .addCase(createOrderRequestThunk.fulfilled, (state, action) => {
        state.success = true;
        state.isLoading = false;
        state.order.number = action.payload.order.number;
        state.name = action.payload.name;
      })
      .addCase(createOrderRequestThunk.rejected, (state) => {
        state.success = false;
        state.isLoading = false;
      });
  }
});
export const { resetOrder } = createOrderSlice.actions;
export default createOrderSlice.reducer;
