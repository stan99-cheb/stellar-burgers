import { TUser } from '@utils-types';
import userSlice, {
  userRegister,
  userLogin,
  userUpdate,
  userLogout,
  userCheckAuth,
  initialState
} from './userSlice';

const USER: TUser = { email: 'test@mail.com', name: 'Test User' };

describe('Тестирование слайса userSlice', () => {
  it('тест initialState', () => {
    expect(userSlice(undefined, { type: '' })).toEqual(initialState);
  });

  it('тест обработки состояния pending для userRegister', () => {
    const action = { type: userRegister.pending.type };
    const state = userSlice(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('тест обработки состояния fulfilled для userRegister', () => {
    const action = {
      type: userRegister.fulfilled.type,
      payload: { user: USER }
    };
    const state = userSlice({ ...initialState, isLoading: true }, action);
    expect(state.user).toEqual(USER);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('тест обработки состояния rejected для userRegister', () => {
    const error = 'Ошибка регистрации';
    const action = {
      type: userRegister.rejected.type,
      error: { message: error }
    };
    const state = userSlice({ ...initialState, isLoading: true }, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('тест обработки состояния fulfilled для userLogin', () => {
    const action = {
      type: userLogin.fulfilled.type,
      payload: { user: USER }
    };
    const state = userSlice(initialState, action);
    expect(state.user).toEqual(USER);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('тест обработки состояния fulfilled для userUpdate', () => {
    const prevState = {
      ...initialState,
      user: { email: 'old@mail.com', name: 'Old Name' }
    };
    const action = {
      type: userUpdate.fulfilled.type,
      payload: { user: USER }
    };
    const state = userSlice(prevState, action);
    expect(state.user).toEqual(USER);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('тест обработки состояния fulfilled для userLogout', () => {
    const prevState = {
      ...initialState,
      user: USER
    };
    const action = { type: userLogout.fulfilled.type };
    const state = userSlice(prevState, action);
    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('тест обработки состояния pending userCheckAuth', () => {
    const action = { type: userCheckAuth.pending.type };
    const state = userSlice(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.isAuthChecked).toBe(false);
    expect(state.error).toBeNull();
  });

  it('тест обработки состояния fulfilled userCheckAuth', () => {
    const action = {
      type: userCheckAuth.fulfilled.type,
      payload: { user: USER }
    };
    const state = userSlice(initialState, action);
    expect(state.user).toEqual(USER);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('тест обработки состояния rejected userCheckAuth', () => {
    const prevState = {
      ...initialState,
      user: USER
    };
    const action = {
      type: userCheckAuth.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = userSlice(prevState, action);
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
