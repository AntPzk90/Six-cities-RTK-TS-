import React from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../../store/hooks';

import {
  changeActivePinOnMap,
  changeHotelFavoriteStatusAsync,
  getFavoriteHotelsAsync
} from '../../../fetures/cities/citiesSlice';
import {ratingLine} from '../../../helpers/ratingLine';
import {toast} from 'react-toastify';

interface IProps {
  preview: string;
  title: string;
  id: number;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  price: number;
}

function HotelPreview({
  preview,
  title,
  id,
  isFavorite,
  isPremium,
  rating,
  type,
  price
}: IProps): JSX.Element {
  const dispatch = useAppDispatch();
  const changeActivePinHandler = (activePinId: number | null) => {
    if (activePinId !== null) {
      dispatch(changeActivePinOnMap(activePinId));
      return;
    }
    dispatch(changeActivePinOnMap(null));
  };

  const changeFavoriteStatusHandler = () => {
    dispatch(
      changeHotelFavoriteStatusAsync(`/favorite/${id}/${isFavorite ? 0 : 1}`)
    ).then((res) => {
      if (res.meta.requestStatus === 'rejected') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        toast.error(res.error.message);
      }
    });
    dispatch(getFavoriteHotelsAsync('/favorite'));
  };

  return (
    <article className="cities__card place-card"
      onMouseEnter={() => {
        changeActivePinHandler(id);
      }}
      onMouseLeave={() => {
        changeActivePinHandler(null);
      }}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={{pathname: '/inner', search: `id=${id}`}}>
          <img
            className="place-card__image"
            src={preview}
            width={260}
            height={200}
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite && 'place-card__bookmark-button--active'}`}
            type="button"
            onClick={changeFavoriteStatusHandler}
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingLine(rating)}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={{pathname: '/inner', search: `id=${id}`}}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default HotelPreview;
