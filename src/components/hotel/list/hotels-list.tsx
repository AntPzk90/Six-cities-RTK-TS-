import React from 'react';

import HotelPreview from '../preview/hotel-preview';
import SortForm from '../../sort/sort-form';

import {Hotel} from '../../../types/types';

interface IProps {
  isNearHotelsList?: boolean;
  hotels: Hotel[];
}

function HotelsList({isNearHotelsList, hotels}: IProps): JSX.Element {
  const sortedHotelsCount = hotels.length;
  return (
    <section className={`${isNearHotelsList ? '' : 'cities__places'} places`}>
      {!isNearHotelsList && <SortForm hotelsCount={sortedHotelsCount}/>}
      <div className={`places__list ${isNearHotelsList ? 'near-places__list' : 'cities__places-list tabs__content'}`}>
        {hotels.map((hotel) => (
          <HotelPreview
            preview={hotel.previewImage}
            title={hotel.title}
            id={hotel.id}
            isFavorite={hotel.isFavorite}
            isPremium={hotel.isPremium}
            rating={hotel.rating}
            type={hotel.type}
            price={hotel.price}
            key={hotel.id}
          />))}
      </div>
    </section>
  );
}

export default HotelsList;
