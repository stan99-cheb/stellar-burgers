import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookie';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { RootState } from '../store';
import { TUser } from '@utils-types';

type InitialState = {
  isAuthChecked: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string | null;
};

const initialState: InitialState = {
  isAuthChecked: false,
  isLoading: false,
  user: null,
  error: null
};

export const userRegister = createAsyncThunk(
  'user/register',
  (data: TRegisterData) => registerUserApi(data)
);

export const userLogin = createAsyncThunk('user/login', (data: TLoginData) =>
  loginUserApi(data)
);

export const userUpdate = createAsyncThunk(
  'user/update',
  (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const userLogout = createAsyncThunk('user/logout', () => logoutApi());

export const userCheckAuth = createAsyncThunk('user/checkAuth', () => {
  if (getCookie('accessToken')) {
    return getUserApi();
  }
  return Promise.reject(new Error('No access token'));
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isAuthChecked = false;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        console.log('userRegister fulfilled', action.payload);
      })
      .addCase(userRegister.rejected, (state, { error }) => {
        state.isAuthChecked = true;
        state.error = error.message || 'Unknown error';
      })

      .addCase(userLogin.pending, (state) => {
        state.isAuthChecked = false;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, { error }) => {
        state.isAuthChecked = true;
        state.error = error.message || 'Unknown error';
      })

      .addCase(userUpdate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userUpdate.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
      })
      .addCase(userUpdate.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message || 'Unknown error';
      })

      .addCase(userLogout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(userLogout.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message || 'Unknown error';
      })

      .addCase(userCheckAuth.pending, (state) => {
        state.isAuthChecked = false;
        state.error = null;
      })
      .addCase(userCheckAuth.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(userCheckAuth.rejected, (state, { error }) => {
        state.isAuthChecked = true;
        state.error = error.message || 'Unknown error';
      });
  }
});

// export const { setUser, setAuthChecked } = userSlice.actions;
export default userSlice.reducer;
