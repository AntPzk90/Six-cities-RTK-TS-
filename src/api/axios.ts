import axios from 'axios';
import {getItem} from '../helpers/persistanceStorage';

axios.defaults.baseURL = 'https://12.react.htmlacademy.pro/six-cities';

axios.interceptors.request.use((config) => {
  const userToken = getItem('user-token');
  const authToken = userToken ? userToken : '';
  config.headers['Content-Type'] = 'application/json';
  config.headers['X-token'] = authToken;

  return config;
});

export default axios;
