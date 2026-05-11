import axios from 'axios';

import { env } from '../config/env';

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config) => {
    // TODO: Inject auth token from secure storage when auth layer is implemented.
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: Handle token refresh and global API errors once auth endpoints exist.
    return Promise.reject(error);
  }
);
