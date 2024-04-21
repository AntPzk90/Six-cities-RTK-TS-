import React from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {changeCurrentCity} from '../../fetures/cities/citiesSlice';

import {LOCATIONS} from '../../constants/constants';

interface IProps {
  currentCity: string
}

function Locations({currentCity}: IProps) {
  const dispatch = useDispatch();

  const dispatchCurrentCityHandler = (city: string) => {
    dispatch(changeCurrentCity(city));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {LOCATIONS.map((locationItem) => (
            <li className="locations__item" key={locationItem}>
              <NavLink to={locationItem}
                className={({isActive}) =>
                  isActive ? 'tabs__item--active locations__item-link tabs__item' : 'locations__item-link tabs__item'}
              >
                <span onClick={() => dispatchCurrentCityHandler(locationItem)}>{locationItem}</span>
              </NavLink>
            </li>)
          )}
        </ul>
      </section>
    </div>
  );
}

export default Locations;
