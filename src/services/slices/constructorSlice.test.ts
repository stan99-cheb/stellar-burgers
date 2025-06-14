import constructorReducer, {
  constructorAdd,
  constructorDel,
  constructorMoveDown,
  constructorMoveUp
} from './constructorSlice';
import { clearCurrentOrder } from './ordersSlice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

describe('Тестирование слайса constructorSlice', () => {
  const bun: TIngredient = {
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
  };
  const ingredient1: TConstructorIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    id: 'a'
  };
  const ingredient2: TConstructorIngredient = {
    _id: '643d69a5c3f7b9001cfa093f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    id: 'b'
  };

  it('тест initialState', () => {
    expect(constructorReducer(undefined, { type: '' })).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('тест добавления булки', () => {
    const state = constructorReducer(undefined, constructorAdd(bun));
    expect(state.bun).toEqual(bun);
  });

  it('тест добавления ингредиента', () => {
    const state = constructorReducer(undefined, constructorAdd(ingredient1));
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]._id).toBe(ingredient1._id);
  });

  it('тест очистки конструктора', () => {
    const stateWithData = { bun, ingredients: [{ ...ingredient1 }] };
    const state = constructorReducer(stateWithData, clearCurrentOrder());
    expect(state).toEqual({ bun: null, ingredients: [] });
  });

  it('тест удаления ингредиента по id', () => {
    const initialState = { bun, ingredients: [ingredient1, ingredient2] };
    const state = constructorReducer(initialState, constructorDel(ingredient2));
    expect(state.ingredients).toEqual([ingredient1]);
  });

  it('тест перемещения ингредиента вниз', () => {
    const initialState = { bun, ingredients: [ingredient1, ingredient2] };
    const state = constructorReducer(
      initialState,
      constructorMoveDown(ingredient1)
    );
    expect(state.ingredients).toEqual([ingredient2, ingredient1]);
  });

  it('тест перемещения ингредиента вверх', () => {
    const initialState = { bun, ingredients: [ingredient1, ingredient2] };
    const state = constructorReducer(
      initialState,
      constructorMoveUp(ingredient2)
    );
    expect(state.ingredients).toEqual([ingredient2, ingredient1]);
  });
});
