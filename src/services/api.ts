import axios from 'axios';

const api = axios.create();

// Request interceptor for API calls
api.interceptors.request.use(
  async (config) => {
    config.headers = {
      'Content-Type': 'application/json',
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Reponse interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {}
);

export { api };
