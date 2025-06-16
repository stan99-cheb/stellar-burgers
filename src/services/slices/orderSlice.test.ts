import { TOrder } from '@utils-types';
import ordersSlice, {
  getOrders,
  createOrder,
  clearCurrentOrder,
  initialState
} from './ordersSlice';

const ORDER: TOrder = {
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
};

describe('Тестирование слайса ordersSlice', () => {
  it('тест initialState', () => {
    expect(ordersSlice(undefined, { type: '' })).toEqual(initialState);
  });

  it('тест очистки текущего заказа', () => {
    const prevState = {
      ...initialState,
      currentOrder: ORDER
    };
    const action = clearCurrentOrder();
    const state = ordersSlice(prevState, action);
    expect(state.currentOrder).toBeNull();
  });

  it('тест обработки состояния pending для getOrders', () => {
    const action = { type: getOrders.pending.type };
    const state = ordersSlice(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('тест обработки состояния fulfilled для getOrders', () => {
    const action = { type: getOrders.fulfilled.type, payload: [ORDER] };
    const state = ordersSlice({ ...initialState, loading: true }, action);
    expect(state.orders).toEqual([ORDER]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('тест обработки состояния rejected для getOrders', () => {
    const error = 'Ошибка загрузки';
    const action = { type: getOrders.rejected.type, error: { message: error } };
    const state = ordersSlice({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('тест обработки состояния pending для createOrder', () => {
    const action = { type: createOrder.pending.type };
    const state = ordersSlice(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('тест обработки состояния fulfilled для createOrder', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: { order: ORDER }
    };
    const state = ordersSlice({ ...initialState, loading: true }, action);
    expect(state.currentOrder).toEqual(ORDER);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('тест обработки состояния rejected для createOrder', () => {
    const error = 'Ошибка создания заказа';
    const action = {
      type: createOrder.rejected.type,
      error: { message: error }
    };
    const state = ordersSlice({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
});
