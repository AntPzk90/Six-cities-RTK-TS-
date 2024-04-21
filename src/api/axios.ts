import axios from 'axios';
import {getItem} from '../helpers/persistanceStorage';
// import {toast} from 'react-toastify';

axios.defaults.baseURL = 'https://12.react.htmlacademy.pro/six-cities';

axios.interceptors.request.use((config) => {
  const userToken = getItem('user-token');
  const authToken = userToken ? userToken : '';
  config.headers['Content-Type'] = 'application/json';
  config.headers['X-token'] = authToken;

  return config;
});

// axios.interceptors.response.use((response) => response,
//   (error) => {
//     // eslint-disable-next-line no-console
//     console.log('error', error.response);
//     if (error.response.status === 401) {
//       // eslint-disable-next-line no-console
//       console.log('Ошибка 401: Пользователь не авторизован', toast);
//       toast.error('Ошибка 401: Пользователь не авторизован');
//
//     }
//     return Promise.reject(error);
//   }
// );
export default axios;
