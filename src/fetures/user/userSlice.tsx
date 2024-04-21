import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {checkLoginUser, loginUser, logoutUser} from '../../api/api';
import {LoginFieldsType, UserResponseType} from '../../types/types';

export interface UserState {
  user: UserResponseType | null;
  isLogin: boolean;
  status: string;
  error: null;
}

const initialState: UserState = {
  user: null,
  isLogin: false,
  status: 'idle',
  error: null,
};

export const postUserAsync = createAsyncThunk(
  'user/postUserData',
  async (data: { url: string, data: LoginFieldsType }) => {
    const response: UserResponseType = await loginUser(data);
    return response;
  }
);

export const logoutUserAsync = createAsyncThunk(
  'user/logoutUserData',
  async (url: string) => await logoutUser(url)
);

export const checkUserAsync = createAsyncThunk(
  'user/checkUserLogin',
  async (url: string) => await checkLoginUser(url)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUser: (state, action: PayloadAction<null>) => {
      state.user = null;
      localStorage.setItem('user-token', 'null');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLogin = true;
        localStorage.setItem('user-token', JSON.stringify(action.payload.token));
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.isLogin = false;
        state.user = null;
        localStorage.removeItem('user-token');
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        // eslint-disable-next-line no-console
        console.log(action.payload);
        if (action.payload.status === 401) {
          state.user = null;
        } else {
          state.user = action.payload;
        }
        localStorage.getItem('user-token') ? state.isLogin = true : state.isLogin = false;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          // eslint-disable-next-line no-console
          state.status = 'idle';
          state.error = action.error;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.status = 'idle';
        }
      );
  }
});

export default userSlice.reducer;
