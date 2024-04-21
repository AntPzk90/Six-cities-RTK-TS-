import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useAppDispatch} from '../../../store/hooks';
import {postUserAsync} from '../../../fetures/user/userSlice';

function AuthForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required('email'),
    password: Yup.string().required('Enter your password')
  });

  const handleSubmit = (data: { email: string, password: string }) => {
    dispatch(postUserAsync({url: '/login', data: data}));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="login__form form">
        <div className="login__input-wrapper form__input-wrapper">
          <label htmlFor="email" className="visually-hidden">E-mail</label>
          <Field
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="login__input form__input"
          />
          <ErrorMessage name="email" component="div" className="error"/>
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <label htmlFor="password" className="visually-hidden">Password</label>
          <Field
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="login__input form__input"
          />
          <ErrorMessage name="password" component="div" className="error"/>
        </div>
        <button className="login__submit form__submit button" type="submit">
          Sign in
        </button>
      </Form>
    </Formik>
  );
}

export default AuthForm;
