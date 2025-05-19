import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '@api';
import { TOrdersData, TOrder } from '@utils-types';

type InitialState = TOrdersData & {
  isLoading: boolean;
  error: string | null;
  current: TOrder | null;
};

const initialState: InitialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null,
  current: null
};

export const getFeed = createAsyncThunk('feed/getFeed', () => getFeedsApi());

export const getOrderByNumber = createAsyncThunk(
  'feed/orderByID',
  (number: number) => getOrderByNumberApi(number)
);

const feedSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
      })
      .addCase(getFeed.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message || 'Unknown error';
      })

      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.current = payload.orders.pop() ?? null;
      })
      .addCase(getOrderByNumber.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message || 'Unknown error';
      });
  }
});

// export const {} = feedSlice.actions;
export default feedSlice.reducer;
