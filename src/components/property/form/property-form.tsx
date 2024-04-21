import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useLocation} from 'react-router-dom';

import {useAppDispatch} from '../../../store/hooks';
import {postReviewAsync} from '../../../fetures/property/propertySlice';


function PropertyForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id: string | null = searchParams.get('id');

  const initialValues = {
    rating: '',
    review: ''
  };

  const validationSchema = Yup.object({
    // rating: Yup.string().required('Rating is required'),
    review: Yup.string().required('Review is required').min(50, 'Review must be at least 50 characters long')
  });

  const ratingTitles: { [key: number]: string } = {
    5: 'perfect',
    4: 'good',
    3: 'not bad',
    2: 'badly',
    1: 'terribly'
  };

  const handleSubmit = ({rating, review}: { rating: string; review: string }) => {
    dispatch(postReviewAsync({
      url: `comments/${id}`,
      data: {
        comment: review,
        rating: parseInt(rating, 10),
      },
    }));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="reviews__form form">
        <label className="reviews__label form__label" htmlFor="review">
          Your review
        </label>
        <div className="reviews__rating-form form__rating">
          {[5, 4, 3, 2, 1].map((rating) => (
            <React.Fragment key={rating}>
              <Field
                type="radio"
                name="rating"
                value={rating.toString()}
                id={`${rating}-stars`}
                className="form__rating-input visually-hidden"
              />
              <label
                htmlFor={`${rating}-stars`}
                className="reviews__rating-label form__rating-label"
                title={ratingTitles[rating]}
              >
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star"/>
                </svg>
              </label>
            </React.Fragment>
          ))}
        </div>
        <ErrorMessage name="rating" component="div" className="error-message"/>
        <Field
          as="textarea"
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
        />
        <ErrorMessage name="review" component="div" className="error-message"/>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set{' '}
            <span className="reviews__star">rating</span> and describe your
            stay with at least{' '}
            <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
          >
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default PropertyForm;
