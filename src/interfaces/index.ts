import axios, { type AxiosRequestConfig } from 'axios';
import { message } from 'antd';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 3000,
});

export default axiosInstance;

// 请求拦截器：自动附加 token
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 响应拦截器：统一错误处理
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { data, config } = error.response;

    if (data.code === 401 && !config._retried) {
      config._retried = true;

      const refreshToken = localStorage.getItem('refresh_token');
      try {
        const res = await axios.get('http://localhost:3000/user/refresh', {
          params: { refreshToken },
        });

        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);

        return axiosInstance(config);
      } catch (e) {
        message.error(data.data || '登录已过期，请重新登录');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      }
    } else {
      return error.response;
    }
  }
);


