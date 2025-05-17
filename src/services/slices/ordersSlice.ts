import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

type InitialState = {
  orders: TOrder[];
  currentOrder: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null
};

export const getOrders = createAsyncThunk('orders/getOrders', () =>
  getOrdersApi()
);

export const createOrder = createAsyncThunk(
  'orders/create',
  (order: string[]) => orderBurgerApi(order)
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder(state) {
      state.currentOrder = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = payload;
      })
      .addCase(getOrders.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || 'Unknown error';
      })

      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentOrder = payload.order;
      })
      .addCase(createOrder.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || 'Unknown error';
      });
  }
});

export const { clearCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
