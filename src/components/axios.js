// Import Axios
import axios from 'axios';
import Cookies from 'js-cookie';

// Create an instance of Axios
const instance = axios.create({
  baseURL:  'http://127.0.0.1:8000/api'
});

// Request interceptor
instance.interceptors.request.use(
  config => {
    var token='';
if(Cookies.get('userData')){
  const cookieData = JSON.parse(Cookies.get('userData'));
  token = cookieData.access_token;
}

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  error => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Export the Axios instance with interceptors
export default instance;
