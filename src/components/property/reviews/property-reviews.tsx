import React, {ReactNode} from 'react';

import {CommentType} from '../../../types/types';
import {getDate} from '../../../helpers/getDate';
import {ratingLine} from '../../../helpers/ratingLine';

interface IProps {
  children: ReactNode;
  reviews: CommentType[] | null;
}

function PropertyReviews({children, reviews}: IProps): JSX.Element {

  return (
    <section className="property__reviews reviews">
      {reviews !== null &&
        <>
          <h2 className="reviews__title">
            Reviews · <span className="reviews__amount">{reviews.length}</span>
          </h2>
          <ul className="reviews__list">
            {reviews.map((review: CommentType) => (
              <li className="reviews__item" key={review.id}>
                <div className="reviews__user user">
                  <div className="reviews__avatar-wrapper user__avatar-wrapper">
                    <img
                      className="reviews__avatar user__avatar"
                      src={review.user.avatarUrl}
                      width={54}
                      height={54}
                      alt="Reviews avatar"
                    />
                  </div>
                  <span className="reviews__user-name">{review.user.name}</span>
                </div>
                <div className="reviews__info">
                  <div className="reviews__rating rating">
                    <div className="reviews__stars rating__stars">
                      <span style={{width: ratingLine(review.rating)}}/>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <p className="reviews__text">
                    {review.comment}
                  </p>
                  <time className="reviews__time" dateTime="2019-04-24">
                    {getDate(review.date)}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        </>}
      {children}
    </section>
  );
}

export default PropertyReviews;
