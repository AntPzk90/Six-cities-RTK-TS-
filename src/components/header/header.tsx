import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getFavoriteHotelsAsync} from '../../fetures/cities/citiesSlice';

import useAuth from '../../hooks/use-auth';
import type {RootState} from '../../store/store';


interface IProps {
  isAuthPage: boolean
}

function Header({isAuthPage}: IProps): JSX.Element {
  const [favoriteHotelsCount, setFavoriteHotelsCount] = useState(0);
  const {isAuthenticated, logout} = useAuth();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state: RootState) => state.user.user);
  const favoriteHotels = useAppSelector((state: RootState) => state.cities.favoriteHotels);
  const userLogoutHandler = () => {
    logout();
  };

  useEffect(() => {
    dispatch(getFavoriteHotelsAsync('/favorite'));
    setFavoriteHotelsCount(favoriteHotels.length);
  }, [favoriteHotels]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/">
              <span className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src={'img/logo.svg'}
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </span>
            </Link>
          </div>
          {!isAuthPage && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isAuthenticated && (
                  <li className="header__nav-item user">
                    <Link to={'/favorite'}
                      className="header__nav-link header__nav-link--profile"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        {userInfo !== null ? userInfo.name : 'no-name'}
                      </span>
                      <span className="header__favorite-count">{favoriteHotelsCount}</span>
                    </Link>
                  </li>)}
                <li className="header__nav-item">
                  <span className="header__nav-link">
                    {isAuthenticated
                      ?
                      <span className="header__signout"
                        onClick={userLogoutHandler}
                      >
                        Sign out
                      </span>
                      :
                      <Link to={'/auth'}><span className="header__signout">Sign in</span></Link>}
                  </span>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
