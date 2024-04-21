import type {PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {changeHotelFavoriteStatus, fetchFavoriteHotels, fetchHotels} from '../../api/api';

import {Hotel} from '../../types/types';

export interface CitiesState {
  hotels: Hotel[] | [],
  favoriteHotels: Hotel[] | [],
  currentCity: string,
  sortType: string,
  status: 'idle' | 'loading' | 'change-status-loading',
  error?: null | string
  activePinOnMap: null | number;
}

const initialState: CitiesState = {
  hotels: [],
  favoriteHotels: [],
  currentCity: 'paris',
  sortType: 'popular',
  status: 'idle',
  error: null,
  activePinOnMap: null
};

export const getHotelsAsync = createAsyncThunk(
  'hotels/fetchData',
  async (url: string) => await fetchHotels(url)
);

export const getFavoriteHotelsAsync = createAsyncThunk(
  'favoriteHotels/fetchData',
  async (url: string) => await fetchFavoriteHotels(url)
);

export const changeHotelFavoriteStatusAsync = createAsyncThunk(
  'hotels/changeFavoriteStatus',
  async (url: string) => await changeHotelFavoriteStatus(url)
);

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    changeCurrentCity: (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    },
    changeActiveSortType: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload;
    },
    changeActivePinOnMap: (state, action: PayloadAction<number | null>) => {
      state.activePinOnMap = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHotelsAsync.fulfilled, (state, action) => {
        state.status = 'loading';
        state.hotels = action.payload;
      })
      .addCase(getFavoriteHotelsAsync.fulfilled, (state, action) => {
        state.status = 'loading';
        state.favoriteHotels = action.payload;
      })
      .addCase(changeHotelFavoriteStatusAsync.fulfilled, (state, action) => {
        state.hotels[
          state.hotels.findIndex((hotel) => hotel.id === action.payload.id)
        ] = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
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
export const {changeCurrentCity, changeActiveSortType, changeActivePinOnMap} = citiesSlice.actions;

export default citiesSlice.reducer;
