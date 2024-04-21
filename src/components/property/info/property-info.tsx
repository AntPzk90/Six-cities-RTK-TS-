import React from 'react';

import PropertyForm from '../form/property-form';
import PropertyHost from '../host/property-host';

import {changeHotelFavoriteStatusAsync, getFavoriteHotelsAsync} from '../../../fetures/cities/citiesSlice';
import {useAppDispatch} from '../../../store/hooks';
import {changeIsFavoriteStatus} from '../../../fetures/property/propertySlice';

import {CommentType, Host} from '../../../types/types';
import useAuth from '../../../hooks/use-auth';
import PropertyReviews from '../reviews/property-reviews';
import {ratingLine} from '../../../helpers/ratingLine';
import {toast} from 'react-toastify';

interface IProps {
  id: string | null;
  isPremium: boolean;
  title: string;
  rating: number;
  isFavorite: boolean;
  goods?: string[];
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  host: Host;
  description: string;
  reviews: CommentType[] | null;
  loading: string;
}

function PropertyInfo({
  id,
  isPremium,
  title,
  rating,
  isFavorite,
  goods,
  type,
  bedrooms,
  maxAdults,
  price,
  host,
  description,
  reviews,
  loading
}: IProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {isAuthenticated} = useAuth();

  // if (loading === 'loading') {
  //   return <div>loader</div>;
  // }

  const changeFavoriteStatusHandler = () => {
    dispatch(
      changeHotelFavoriteStatusAsync(`/favorite/${id}/${isFavorite ? 0 : 1}`)
    ).then((res) => {
      if (res.meta.requestStatus === 'rejected') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        toast.error(res.error.message);
      }
      dispatch(changeIsFavoriteStatus(res.payload.isFavorite));
    });
    dispatch(getFavoriteHotelsAsync('/favorite'));
  };

  return (
    <div className="property__container container">
      <div className="property__wrapper">
        {isPremium &&
          <div className="property__mark">
            <span>Premium</span>
          </div>}
        <div className="property__name-wrapper">
          <h1 className="property__name">
            {title}
          </h1>
          <button className={`property__bookmark-button button ${isFavorite && 'property__bookmark-button--active'}`}
            type="button"
            onClick={changeFavoriteStatusHandler}
          >
            <svg className="property__bookmark-icon" width={31} height={33}>
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="property__rating rating">
          <div className="property__stars rating__stars">
            <span style={{width: ratingLine(rating)}}/>
            <span className="visually-hidden">Rating</span>
          </div>
          <span className="property__rating-value rating__value">{rating}</span>
        </div>
        <ul className="property__features">
          <li className="property__feature property__feature--entire">
            {type}
          </li>
          <li className="property__feature property__feature--bedrooms">
            {bedrooms} Bedrooms
          </li>
          <li className="property__feature property__feature--adults">
            Max {maxAdults} adults
          </li>
        </ul>
        <div className="property__price">
          <b className="property__price-value">€{price}</b>
          <span className="property__price-text">&nbsp;night</span>
        </div>
        <div className="property__inside">
          <h2 className="property__inside-title">{'What\'s inside'}</h2>
          <ul className="property__inside-list">
            {goods && goods.map((goodsItem) => (
              <li className="property__inside-item" key={goodsItem}>{goodsItem}</li>))}
          </ul>
        </div>
        <PropertyHost host={host} description={description}/>
        {isAuthenticated &&
          <PropertyReviews reviews={reviews}>
            <PropertyForm/>
          </PropertyReviews>}
      </div>
    </div>
  );
}

export default PropertyInfo;
