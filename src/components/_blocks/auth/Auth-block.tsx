import React, {useEffect} from 'react';

import {Link, useNavigate} from 'react-router-dom';
import useAuth from '../../../hooks/use-auth';

import AuthForm from '../../auth/form/auth-form';


function AuthBlock(): JSX.Element {
  const {isAuthenticated} = useAuth();
  const history = useNavigate();

  useEffect(() => {
    isAuthenticated && history('/');
  }, [isAuthenticated, history]);

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <AuthForm/>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link to={'/'} className="locations__item-link">
              <span>Amsterdam</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AuthBlock;
