import React, {ReactNode} from 'react';

import Header from '../header/header';
import {useLocation} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
  children: ReactNode
}

function Layout({children}: IProps): JSX.Element {
  const location = useLocation();

  const isAuthPage = location.pathname === '/auth';

  return (
    <div>
      <div className={`page page--gray page--main ${isAuthPage && 'page--login'}`}>
        <Header isAuthPage={isAuthPage}/>
        {children}
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Layout;
