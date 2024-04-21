import React, {useEffect} from 'react';

import {useLocation} from 'react-router-dom';


import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import type {RootState} from '../../../store/store';
import {getNearbyHotelsAsync, getPropertyAsync, getPropertyReviewsAsync} from '../../../fetures/property/propertySlice';

import PropertyGallery from '../../property/gallery/property-gallery';
import PropertyInfo from '../../property/info/property-info';
import HotelsList from '../../hotel/list/hotels-list';
import Map from '../../map/map';

function PropertyBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  const property = useAppSelector((state: RootState) => state.property.property);
  const nearestHotels = useAppSelector((state: RootState) => state.property.nearestHotels);
  const loadingStatus = useAppSelector((state: RootState) => state.property.status);
  const propertyReviews = useAppSelector((state: RootState) => state.property.reviews);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id: string | null = searchParams.get('id');


  useEffect(() => {
    dispatch(getPropertyAsync(`hotels/${id}`));
    dispatch(getNearbyHotelsAsync((`hotels/${id}/nearby`)));
    dispatch(getPropertyReviewsAsync(`/comments/${id}`));
  }, [dispatch, id]);

  if (Object.keys(property).length === 0) {
    return <div>loader</div>;
  }

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <PropertyGallery images={property.images}/>
        <PropertyInfo
          id={id}
          isPremium={property.isPremium}
          title={property.title}
          rating={property.rating}
          isFavorite={property.isFavorite}
          goods={property.goods}
          type={property.type}
          bedrooms={property.bedrooms}
          maxAdults={property.maxAdults}
          price={property.price}
          host={property.host}
          description={property.description}
          reviews={propertyReviews}
          loading={loadingStatus}
        />
        <section className="property__map map">
          <Map
            cities={[property, ...nearestHotels]}
            loading={loadingStatus}
            activePin={property.id}
          />
        </section>
      </section>
      <div className="container">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <HotelsList hotels={nearestHotels} isNearHotelsList/>
      </div>
    </main>
  );
}

export default PropertyBlock;
