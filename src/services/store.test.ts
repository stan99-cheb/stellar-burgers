import store, { rootReducer } from './store';
import { useSelector, useDispatch } from './store';

describe('Тестирование store', () => {
  it('тест проверки, что rootReducer является функцией', () => {
    expect(typeof rootReducer).toBe('function');
  });

  it('тест rootReducer возвращает состояние со всеми слайсами', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    expect(initialState).toHaveProperty('constructorSlice');
    expect(initialState).toHaveProperty('feedSlice');
    expect(initialState).toHaveProperty('ingredientsSlice');
    expect(initialState).toHaveProperty('ordersSlice');
    expect(initialState).toHaveProperty('userSlice');
  });

  it('тест создания store с rootReducer', () => {
    expect(store).toBeDefined();
    expect(store.getState).toBeInstanceOf(Function);
    const state = store.getState();
    expect(state).toHaveProperty('constructorSlice');
    expect(state).toHaveProperty('feedSlice');
    expect(state).toHaveProperty('ingredientsSlice');
    expect(state).toHaveProperty('ordersSlice');
    expect(state).toHaveProperty('userSlice');
  });

  it('тест экспорта хуков useSelector и useDispatch', () => {
    expect(useSelector).toBeDefined();
    expect(useDispatch).toBeDefined();
    expect(typeof useSelector).toBe('function');
    expect(typeof useDispatch).toBe('function');
  });
});
