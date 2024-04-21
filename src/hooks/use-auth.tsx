import {useEffect, useState} from 'react';

import {useAppSelector, useAppDispatch} from '../store/hooks';
import {logoutUserAsync, checkUserAsync} from '../fetures/user/userSlice';
import {getItem} from '../helpers/persistanceStorage';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const isUserAuth = useAppSelector((state) => state.user.isLogin);
  const dispatch = useAppDispatch();

  const checkAuthentication = () => {
    if (isUserAuth && userToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    dispatch(checkUserAsync('/login'))
      .then(() => setUserToken(getItem('user-token')));
  }, [dispatch]);

  useEffect(() => {
    setUserToken(getItem('user-token'));
    checkAuthentication();
    // eslint-disable-next-line
  }, [isUserAuth, userToken]);

  const logout = () => {
    dispatch(logoutUserAsync('/logout'));
  };

  return {isAuthenticated, logout};
};

export default useAuth;
