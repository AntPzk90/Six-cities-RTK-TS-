import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {useNavigate} from 'react-router-dom';

import FavoriteList from '../../favorite/list/favorite-list';

import {getFavoriteHotelsAsync} from '../../../fetures/cities/citiesSlice';
import useAuth from '../../../hooks/use-auth';
import {structureFavoriteHotels} from '../../../helpers/structureFavoriteHotels';
import type {RootState} from '../../../store/store';


function FavoritesBlock(): JSX.Element {
  const favoritesHotels = useAppSelector((state: RootState) => state.cities.favoriteHotels);
  const {isAuthenticated} = useAuth();
  const dispatch = useAppDispatch();
  const history = useNavigate();

  useEffect(() => {
    dispatch(getFavoriteHotelsAsync('/favorite'))
      .then((res) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (res.error?.message === 'Request failed with status code 401') {
          history('/');
        }
      });
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const structuredFavoriteHotels = () => structureFavoriteHotels(favoritesHotels);


  return (
    <div className="page__favorites-container container">
      <section className="favorites">
        {Object.keys(favoritesHotels).length === 0 && (
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">
                Save properties to narrow down search or plan yor future trips.
              </p>
            </div>
          </section>
        )}
        {Object.keys(favoritesHotels).length > 0 && (
          <>
            <h1 className="favorites__title">Saved listing</h1>
            <FavoriteList favoritesHotels={structuredFavoriteHotels()}/>
          </>
        )}
      </section>
    </div>
  );
}

export default FavoritesBlock;
