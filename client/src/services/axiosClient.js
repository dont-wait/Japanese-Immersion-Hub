import axios from 'axios';
import { API_BASE_URL } from '../config/api';

// ===== Tạo instance Axios =====
const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ===== Request Interceptor: Đính kèm Access Token =====
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ===== Response Interceptor: Tự động Refresh Token =====
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Nếu lỗi 401 và chưa retry
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Nếu đang refresh, đưa request vào hàng đợi
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosClient(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token');
                }

                const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                    refreshToken,
                });

                const newAccessToken = data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);

                if (data.refreshToken) {
                    localStorage.setItem('refreshToken', data.refreshToken);
                }

                axiosClient.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
                processQueue(null, newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                // Refresh thất bại → logout
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
