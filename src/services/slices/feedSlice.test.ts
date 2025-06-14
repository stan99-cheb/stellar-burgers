import feedReducer, { getFeed, getOrderByNumber } from './feedSlice';
import { TOrder } from '@utils-types';

describe('Тестирование слайса feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null,
    current: null
  };

  it('тест initialState', () => {
    expect(feedReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('тест обработки состояния pending для getFeed', () => {
    const action = { type: getFeed.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('тест обработки состояния fulfilled для getFeed', () => {
    const orders: TOrder[] = [
      {
        _id: '68266246c2f30c001cb24190',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный био-марсианский бургер',
        createdAt: '2025-05-15T21:53:10.512Z',
        updatedAt: '2025-05-15T21:53:11.178Z',
        number: 77339
      }
    ];
    const action = {
      type: getFeed.fulfilled.type,
      payload: { orders, total: 10, totalToday: 2 }
    };
    const state = feedReducer(initialState, action);
    expect(state.orders).toEqual(orders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(2);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('тест обработки состояния rejected для getFeed', () => {
    const action = {
      type: getFeed.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });

  it('тест обработки состояния pending для getOrderByNumber', () => {
    const action = { type: getOrderByNumber.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('тест обработки состояния fulfilled для getOrderByNumber', () => {
    const order: TOrder = { _id: '2', number: 2 } as TOrder;
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [order] }
    };
    const state = feedReducer(initialState, action);
    expect(state.current).toEqual(order);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('тест обработки состояния rejected для getOrderByNumber', () => {
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: 'Ошибка поиска заказа' }
    };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка поиска заказа');
  });
});
