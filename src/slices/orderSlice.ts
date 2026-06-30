import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrders, getOrderByNum, createOrderRequest } from '@api';

export const getOrdersThunk = createAsyncThunk('/orders/all', () =>
  getOrders()
);
export const getOrderByNumThunk = createAsyncThunk(
  'orders/getByNum',
  (orderId: number) => getOrderByNum(orderId)
);
export const createOrderRequestThunk = createAsyncThunk(
  'orders/create',
  (orderData: { ingredients: string[]; token: string }) =>
    createOrderRequest(orderData.ingredients, orderData.token)
);
type TOrderState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderNumber: number | null;
  error?: string;
};

const initialState: TOrderState = {
  orders: [],
  total: 0,
  totalToday: 0,
  orderRequest: false,
  orderModalData: null,
  orderNumber: null
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
      })
      .addCase(createOrderRequestThunk.pending, (state) => {
        state.orderRequest = true; // включаем спиннер загрузки
        state.error = undefined;
      })
      .addCase(createOrderRequestThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderNumber = action.payload.order.number;
      })
      .addCase(createOrderRequestThunk.rejected, (state) => {
        state.orderRequest = false;
        state.error = 'Ошибка при оформлении заказа';
      });
  }
});
export default orderSlice.reducer;
