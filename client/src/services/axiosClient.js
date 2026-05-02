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

axiosClient.interceptors.response.use(
    (response) => {
        if (response.data && response.data.code !== 1000) {
            return Promise.reject(response.data);
        }
        return response;
    },
    async (error) => {
        // Nếu lỗi 401 (Unauthorized)
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');

            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }

        // Trả về dữ liệu lỗi từ server nếu có
        const errorData = error.response?.data || {
            code: 9999,
            message: error.message || 'Lỗi kết nối server'
        };

        return Promise.reject(errorData);
    }
);

export default axiosClient;
