import {Hotel} from '../types/types';

export const sortHotels = (hotels: Hotel[] = [], sortType: string | null) => {
  switch (sortType) {
    case 'low':
      return [...hotels].sort((a, b) => a.price - b.price);
    case 'high':
      return [...hotels].sort((a, b) => b.price - a.price);
    case 'top':
      return [...hotels].sort((a, b) => b.rating - a.rating);
    case null :
      return hotels;
    default:
      return hotels;
  }
};
