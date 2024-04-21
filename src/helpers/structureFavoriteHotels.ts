import {Hotel} from '../types/types';

export const structureFavoriteHotels = (hotels: Hotel[]) => {
  const keys = new Set();
  hotels.forEach((item) => keys.add(item.city.name.toLowerCase()));
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const obj = Array.from(keys).reduce((accumulator, value) => ({...accumulator, [value]: []}), {});
  // eslint-disable-next-line array-callback-return
  hotels.map((hotel) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    obj[hotel.city.name.toLowerCase()].push(hotel);
  });
  return obj;
};
