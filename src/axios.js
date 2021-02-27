// axios
import axios from 'axios'
import store from './store/auth/moduleAuth'

const token = localStorage.getItem('user-token')
axios.defaults.baseURL = '/api'
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
axios.defaults.timeout = 180000
axios.interceptors.response.use(
    response => {
      switch (response.status) {
        case 401:
          store.dispatch("auth/logout");
          break;
      }
      return response;
    },
    error => {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.message);
    }
  );

export default axios;
