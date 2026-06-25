import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { getOrders } from '@api';
import { getOrderByNum } from '@api';

export const getOrdersThunk = createAsyncThunk('/orders/all', () =>
  getOrders()
);
export const getOrderByNumThunk = createAsyncThunk(
  'orders/getByNum',
  (orderId: number) => getOrderByNum(orderId)
);
type TOrderState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error?: string;
};

const initialState: TOrderState = {
  orders: [],
  total: 0,
  totalToday: 0,
  orderRequest: false,
  orderModalData: null
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.orderRequest = true;
        state.error = undefined;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getOrdersThunk.rejected, (state) => {
        state.orderRequest = false;
        state.error = 'Не удалось загрузить заказы';
      });
  }
});
export default orderSlice.reducer;
