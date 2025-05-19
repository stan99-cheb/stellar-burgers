import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

type InitialState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk('ingredients/getAll', () =>
  getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getIngredients.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.ingredients = payload;
    });
    builder.addCase(getIngredients.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message || 'Unknown error';
    });
  }
});

// export const {} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
