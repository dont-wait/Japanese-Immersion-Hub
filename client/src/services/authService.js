import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '../config/api';

const authService = {
    // Đăng nhập
    login: (credentials) => {
        return axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    },

    // Đăng ký
    register: (userData) => {
        return axiosClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    },

    // Đăng nhập bằng Google OAuth2 (gửi authorization code)
    googleLogin: (code) => {
        return axiosClient.post(`${API_ENDPOINTS.AUTH.GOOGLE}?code=${encodeURIComponent(code)}`);
    },

    // Đăng xuất
    logout: () => {
        const token = localStorage.getItem('accessToken');
        return axiosClient.post(API_ENDPOINTS.AUTH.LOGOUT, { token });
    },

    // Quên mật khẩu
    forgotPassword: (email) => {
        return axiosClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    },

    // Đặt lại mật khẩu
    resetPassword: (token, newPassword) => {
        return axiosClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword });
    },
};

export default authService;
