import {GetThunkAPI} from '@reduxjs/toolkit/dist/createAsyncThunk';
import {AnyAction, Dispatch, PayloadAction} from '@reduxjs/toolkit';

export type Host = {
  id: number;
  name: string;
  isPro: boolean;
  avatarUrl: string;
}

export type Hotel = {
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  previewImage: string;
  images: string[];
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: Host;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  id: number;
};

export type LoginFieldsType = {
  email: string;
  password: string;
}

export type UserResponseType = {
  avatarUrl: string;
  email: string;
  id: number;
  isPro: boolean;
  name: string;
  token: string;
}

export type CommentType = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: UserResponseType;
}
