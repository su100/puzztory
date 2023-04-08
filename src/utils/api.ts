import axios, { AxiosRequestConfig } from 'axios';
import { useAuthStore } from './auth';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const ApiClientBase = axios.create({
  baseURL: `${baseURL}/`,
});

const UserClientBase = axios.create({
  baseURL: `${baseURL}/`,
});

const handleCheckAccessToken = <T extends AxiosRequestConfig>(config: T): T => {
  let { accessToken } = useAuthStore.getState();
  config = config ?? {};
  config.headers = config.headers ?? { 'Content-Type': 'application/json' };

  if (accessToken) {
    config.headers.Authorization = `jwt ${accessToken}`;
  }

  return config;
};

UserClientBase.interceptors.request.use(handleCheckAccessToken);

const ApiClient = {
  get: <T>(url: string, params?: any, config?: AxiosRequestConfig) =>
    ApiClientBase.get<T>(url, { ...config, params }).then((r) => r.data),

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    ApiClientBase.post<T>(url, data, config).then((r) => r.data),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    ApiClientBase.put<T>(url, data, config).then((r) => r.data),

  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    ApiClientBase.patch<T>(url, data, config).then((r) => r.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    ApiClientBase.delete<T>(url, config).then((r) => r.data),
};

const UserClient = {
  get: <T>(url: string, params?: any, config?: AxiosRequestConfig) =>
    UserClientBase.get<T>(url, { ...config, params }).then((r) => r.data),

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    UserClientBase.post<T>(url, data, config).then((r) => r.data),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    UserClientBase.put<T>(url, data, config).then((r) => r.data),

  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    UserClientBase.patch<T>(url, data, config).then((r) => r.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    UserClientBase.delete<T>(url, config).then((r) => r.data),
};

export { ApiClient, UserClient };
