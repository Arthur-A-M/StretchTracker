import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { AuthToken } from '../features/auth/types';

type GetAuthToken = () => Promise<AuthToken | null>;
type HandleUnauthorized = () => Promise<void>;

export function applyAuthInterceptors(
  client: AxiosInstance,
  getAuthToken: GetAuthToken,
  onUnauthorized?: HandleUnauthorized,
): () => void {
  const requestInterceptorId = client.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await getAuthToken();

      if (token?.accessToken) {
        config.headers.set('Authorization', `Bearer ${token.accessToken}`);
      }

      return config;
    },
  );

  const responseInterceptorId = client.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      if (error.response?.status === 401 && onUnauthorized) {
        await onUnauthorized();
      }

      return Promise.reject(error);
    },
  );

  return () => {
    client.interceptors.request.eject(requestInterceptorId);
    client.interceptors.response.eject(responseInterceptorId);
  };
}
