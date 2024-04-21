import React, {useEffect} from 'react';
import {useLocation, useParams} from 'react-router-dom';

import type {RootState} from '../../../store/store';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {changeCurrentCity, getHotelsAsync} from '../../../fetures/cities/citiesSlice';

import Locations from '../../locations/locations';
import HotelsList from '../../hotel/list/hotels-list';
import Map from '../../map/map';

import {sortHotels} from '../../../helpers/sortHotels';
import {Hotel} from '../../../types/types';

function MainBlock(): JSX.Element {
  const hotelsList = useAppSelector((state: RootState) => state.cities.hotels);
  const currentCity = useAppSelector((state: RootState) => state.cities.currentCity);
  const activePinOnMap = useAppSelector((state: RootState) => state.cities.activePinOnMap);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const loadingStatus = useAppSelector((state: RootState) => state.cities.status);
  const searchParams = new URLSearchParams(location.search);
  const sortValue: string | null = searchParams.get('sort');
  const {city} = useParams();

  useEffect(() => {
    dispatch(getHotelsAsync('/hotels'));
    if (city) {
      dispatch(changeCurrentCity(city));
    } else {
      dispatch(changeCurrentCity('paris'));
    }
  }, [dispatch]);

  const filteredHotelsList = (list: Hotel[], activeCity: string) => sortHotels(list.filter((listItem) => listItem.city.name.toLowerCase() === activeCity), sortValue);

  if (loadingStatus === 'loading') {
    return <div>loader</div>;
  }

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <Locations currentCity={currentCity}/>
      <div className="cities">
        <div className="cities__places-container container">
          <HotelsList
            hotels={filteredHotelsList(hotelsList, currentCity)}
          />
          <div className="cities__right-section" style={{width: '46%', overflow: 'hidden~'}}>
            <section className="cities__map map" style={{background: '#eee'}}>
              <Map cities={filteredHotelsList(hotelsList, currentCity)} loading={'idle'} activePin={activePinOnMap}/>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainBlock;
