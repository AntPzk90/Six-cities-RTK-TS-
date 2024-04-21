import {createAsyncThunk, createSlice, type PayloadAction} from '@reduxjs/toolkit';

import {fetchProperty, fetchReviews, postReview} from '../../api/api';

import {CommentType, Hotel} from '../../types/types';


export interface PropertyState {
  property: Hotel | never;
  nearestHotels: Hotel[];
  reviews: CommentType[] | null;
  status: string,
  error: null
}

const initialState: PropertyState = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  property: {},
  nearestHotels: [],
  reviews: null,
  status: 'idle',
  error: null,
};

export const getPropertyAsync = createAsyncThunk(
  'property/fetchData',
  async (url: string) => await fetchProperty(url)
);

export const getNearbyHotelsAsync = createAsyncThunk(
  'nearbyProperty/fetchData',
  async (url: string) => await fetchProperty(url)
);

export const getPropertyReviewsAsync = createAsyncThunk(
  'reviews/fetchData',
  async (url: string) => await fetchReviews(url)
);

export const postReviewAsync = createAsyncThunk(
  'review/postNewReview',
  async (data: { url: string, data: { comment: string, rating: number; } }) => postReview(data)
);

export const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    changeIsFavoriteStatus: (state, action: PayloadAction<boolean>) => {
      state.property.isFavorite = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPropertyAsync.fulfilled, (state, action) => {
        state.property = action.payload;
      })
      .addCase(getNearbyHotelsAsync.fulfilled, (state, action) => {
        state.nearestHotels = action.payload;
      })
      .addCase(getPropertyReviewsAsync.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReviewAsync.fulfilled, (state, action) => {
        state.reviews = action.payload;
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


export const {changeIsFavoriteStatus} = propertySlice.actions;

export default propertySlice.reducer;
