import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const selectors = {
  ingredients: {
    getAll: (state: RootState) => state.ingredientsSlice.ingredients,
    getByID: (id: string) => (state: RootState) =>
      state.ingredientsSlice.ingredients.find(
        (ingredient) => ingredient._id === id
      ),
    getIsLoading: (state: RootState) => state.ingredientsSlice.isLoading,
    getBuns: createSelector(
      (state: RootState) => state.ingredientsSlice.ingredients,
      (ingredients) =>
        ingredients.filter((ingredient) => ingredient.type === 'bun')
    ),
    getMains: createSelector(
      (state: RootState) => state.ingredientsSlice.ingredients,
      (ingredients) =>
        ingredients.filter((ingredient) => ingredient.type === 'main')
    ),
    getSauces: createSelector(
      (state: RootState) => state.ingredientsSlice.ingredients,
      (ingredients) =>
        ingredients.filter((ingredient) => ingredient.type === 'sauce')
    ),
    getError: (state: RootState) => state.ingredientsSlice.error
  },
  constructor: {
    getAll: (state: RootState) => state.constructorSlice
  },
  feed: {
    getOrders: (state: RootState) => state.feedSlice.orders,
    getFeed: createSelector(
      (state: RootState) => state.feedSlice.total,
      (state: RootState) => state.feedSlice.totalToday,
      (total, totalToday) => ({ total, totalToday })
    ),
    getOrderByID: (number: number) => (state: RootState) =>
      state.feedSlice.orders.find((order) => order.number === number),
    getCurrent: (state: RootState) => state.feedSlice.current,
    getIsLoading: (state: RootState) => state.feedSlice.isLoading
  },
  user: {
    getIsAuthChecked: (state: RootState) => state.userSlice.isAuthChecked,
    getUser: (state: RootState) => state.userSlice.user
  },
  orders: {
    getOrders: (state: RootState) => state.ordersSlice.orders,
    getCurrentOrder: (state: RootState) => state.ordersSlice.currentOrder,
    getIsLoading: (state: RootState) => state.ordersSlice.loading,
    getError: (state: RootState) => state.ordersSlice.error
  }
};
