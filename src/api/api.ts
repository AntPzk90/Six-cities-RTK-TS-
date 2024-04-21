import axios from './axios';
import {LoginFieldsType} from '../types/types';

export const fetchHotels = (url: string) =>
  axios.get(url).then((response) => response.data);

export const fetchProperty = (url: string) =>
  axios.get(url).then((response) => response.data);

export const loginUser = ({url, data}: { url: string, data: LoginFieldsType }) =>
  axios
    .post(url, data)
    .then((response) => response.data);

export const logoutUser = (url: string) =>
  axios.delete(url).then((response) => response.data);

export const checkLoginUser = (url: string) =>
  axios
    .get(url)
    .then((response) => response.data);

export const fetchFavoriteHotels = (url: string) =>
  axios.get(url).then((response) => response.data);

export const changeHotelFavoriteStatus = (url: string) =>
  axios.post(url)
    .then((response) => response.data);

export const postReview = ({url, data}: { url: string, data: { rating: number, comment: string } }) =>
  axios.post(url, data).then((response) => response.data);

export const fetchReviews = (url: string) =>
  axios.get(url).then((response) => response.data);
