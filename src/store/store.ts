import {configureStore} from '@reduxjs/toolkit';
import citiesReducer from '../fetures/cities/citiesSlice';
import propertyReducer from '../fetures/property/propertySlice';
import userReducer from '../fetures/user/userSlice';
import axios from '../api/axios';

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    property: propertyReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: axios,
      },
    }),
  devTools: true
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
