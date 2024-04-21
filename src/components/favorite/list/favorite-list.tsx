import React from 'react';

import FavoritePreview from '../preview/favorite-preview';
import {Hotel} from '../../../types/types';

interface IProps {
  // eslint-disable-next-line
  favoritesHotels: { [key: string]: Hotel } | any;
}

function FavoriteList({favoritesHotels}: IProps): JSX.Element {

  return (
    <ul>
      {Object.keys(favoritesHotels).map((town: string) => (
        <FavoritePreview
          town={town}
          hotels={favoritesHotels[town]}
          key={town}
        />))}
    </ul>
  );
}

export default FavoriteList;
