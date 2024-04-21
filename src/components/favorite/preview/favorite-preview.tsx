import React from 'react';
import {Link} from 'react-router-dom';

import {useAppDispatch} from '../../../store/hooks';
import {changeHotelFavoriteStatusAsync, getFavoriteHotelsAsync} from '../../../fetures/cities/citiesSlice';
import {Hotel} from '../../../types/types';
import {ratingLine} from '../../../helpers/ratingLine';

interface IProps {
  town: string;
  hotels: Hotel[];
}

const FavoritePreview = ({town, hotels}: IProps) => {
  // eslint-disable-next-line no-console
  console.log(hotels);
  const dispatch = useAppDispatch();

  const changeFavoriteStatusHandler = (id: number, isFavorite: boolean) => {
    dispatch(
      changeHotelFavoriteStatusAsync(`/favorite/${id}/${isFavorite ? 0 : 1}`)
    ).then((res) => {
      dispatch(getFavoriteHotelsAsync('/favorite'));
    });
  };

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            className="locations__item-link"
            to={{
              pathname: `/${town}`,
            }}
          >
            <span style={{textTransform: 'capitalize'}}>{town}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {hotels.map((hotel: Hotel) => (
          <article className="favorites__card place-card" key={hotel.id}>
            <div className="favorites__image-wrapper place-card__image-wrapper">
              <Link to={`/offer/${hotel.id}`}>
                <img
                  className="place-card__image"
                  src={hotel.previewImage}
                  width={150}
                  height={110}
                  alt={'Place'}
                />
              </Link>
            </div>
            <div className="favorites__card-info place-card__info">
              <div className="place-card__price-wrapper">
                <div className="place-card__price">
                  <b className="place-card__price-value">€{hotel.price}</b>
                  <span className="place-card__price-text">/&nbsp;night</span>
                </div>
                <button
                  className="place-card__bookmark-button place-card__bookmark-button--active button"
                  type="button"
                  onClick={() => changeFavoriteStatusHandler(hotel.id, hotel.isFavorite)}
                >
                  <svg
                    className="place-card__bookmark-icon"
                    width={18}
                    height={19}
                  >
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">In bookmarks</span>
                </button>
              </div>
              <div className="place-card__rating rating">
                <div className="place-card__stars rating__stars">
                  <span style={{width: ratingLine(hotel.rating)}}/>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <h2 className="place-card__name">
                <Link to={`/offer/${hotel.id}`}>{hotel.title}</Link>
              </h2>
              <p className="place-card__type">{hotel.type}</p>
            </div>
          </article>
        ))}
      </div>
    </li>
  );
};
export default FavoritePreview;
