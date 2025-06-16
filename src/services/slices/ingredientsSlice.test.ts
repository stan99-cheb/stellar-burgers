import ingredientsReducer, {
  getIngredients,
  initialState
} from './ingredientsSlice';
import { TIngredient } from '@utils-types';

const INGREDIENTS: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  }
];

describe('Тестирование слайса ingredientsSlice', () => {
  it('тест initialState', () => {
    expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('тест обработки состояния pending для getIngredients', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('тест обработки состояния fulfilled для getIngredients', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: INGREDIENTS
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(INGREDIENTS);
  });

  it('тест обработки состояния rejected для getIngredients', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
