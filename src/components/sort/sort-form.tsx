import React, {useState, useRef, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

import type {RootState} from '../../store/store';
import {changeActiveSortType} from '../../fetures/cities/citiesSlice';

import {SORT_LIST} from '../../constants/constants';
import {useAppSelector} from '../../store/hooks';

interface IProps {
  hotelsCount: number;
}

function SortForm({hotelsCount}: IProps): JSX.Element {
  const [isSortListActive, setSortListActive] = useState(false);
  const currentCity = useAppSelector((state: RootState) => state.cities.currentCity);
  const activeSortType = useAppSelector((state: RootState) => state.cities.sortType);
  const dispatch = useDispatch();
  const sortFormRef = useRef<HTMLFormElement>(null);

  const dispatchActiveSortType = (sortType: string) => {
    dispatch(changeActiveSortType(sortType));
  };

  const changeActiveStatusSortListHandler = (sortListActiveStatus: boolean) => {
    setSortListActive(sortListActiveStatus);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortFormRef.current && !sortFormRef.current.contains(event.target as Node)) {
        setSortListActive(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{hotelsCount} places to stay in {currentCity}</b>
      <form
        ref={sortFormRef}
        className="places__sorting"
      >
        <span onClick={() => changeActiveStatusSortListHandler(true)}>
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
            &nbsp; {activeSortType}
            <svg className="places__sorting-arrow" width={7} height={4}>
              <use xlinkHref="#icon-arrow-select"/>
            </svg>
          </span>
        </span>
        {isSortListActive &&
          <ul className="places__options places__options--custom places__options--opened">
            {SORT_LIST.map((sortListItem) => (
              <li className={`places__option ${activeSortType === sortListItem.key && 'places__option--active'}`}
                key={sortListItem.key}
              >
                <Link to={`?sort=${sortListItem.key}`} tabIndex={0}
                  onClick={() => {
                    changeActiveStatusSortListHandler(false);
                    dispatchActiveSortType(sortListItem.key);
                  }}
                >
                  {sortListItem.title}
                </Link>
              </li>
            ))}
          </ul>}
      </form>
    </>
  );
}

export default SortForm;
