import { clearCurrentOrder } from './ordersSlice';
import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type InitialState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: InitialState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    constructorAdd(state, { payload: ingredient }) {
      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.ingredients.push({ ...ingredient, id: crypto.randomUUID() });
      }
    },
    constructorDel(state, { payload: ingredient }) {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== ingredient.id
      );
    },
    constructorMoveDown(state, { payload: ingredient }) {
      const index = state.ingredients.findIndex(
        (item) => item.id === ingredient.id
      );
      [state.ingredients[index], state.ingredients[index + 1]] = [
        state.ingredients[index + 1],
        state.ingredients[index]
      ];
    },
    constructorMoveUp(state, { payload: ingredient }) {
      const index = state.ingredients.findIndex(
        (item) => item.id === ingredient.id
      );
      [state.ingredients[index], state.ingredients[index - 1]] = [
        state.ingredients[index - 1],
        state.ingredients[index]
      ];
    }
  },
  extraReducers(builder) {
    builder.addCase(clearCurrentOrder, (state) => {
      state.bun = null;
      state.ingredients = [];
    });
  }
});

export const {
  constructorAdd,
  constructorDel,
  constructorMoveDown,
  constructorMoveUp
} = constructorSlice.actions;
export default constructorSlice.reducer;
