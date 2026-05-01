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

    // Đăng nhập bằng Google OAuth2
    googleLogin: (tokenId) => {
        return axiosClient.post(API_ENDPOINTS.AUTH.GOOGLE, { tokenId });
    },

    // Đăng xuất
    logout: () => {
        const refreshToken = localStorage.getItem('refreshToken');
        return axiosClient.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
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
