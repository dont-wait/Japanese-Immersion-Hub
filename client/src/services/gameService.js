import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '../config/api';

const gameService = {
    // Lấy bảng xếp hạng (tuần / tháng / all-time)
    getLeaderboard: (period = 'weekly', params = {}) => {
        return axiosClient.get(API_ENDPOINTS.GAME.LEADERBOARD, {
            params: { period, ...params },
        });
    },

    // Lấy XP hiện tại của user
    getXp: () => {
        return axiosClient.get(API_ENDPOINTS.GAME.XP);
    },

    // Lấy mục tiêu hàng ngày
    getDailyGoal: () => {
        return axiosClient.get(API_ENDPOINTS.GAME.DAILY_GOAL);
    },

    // Cập nhật mục tiêu hàng ngày
    updateDailyGoal: (target) => {
        return axiosClient.put(API_ENDPOINTS.GAME.DAILY_GOAL, { target });
    },

    // Lấy danh sách thành tích
    getAchievements: () => {
        return axiosClient.get(API_ENDPOINTS.GAME.ACHIEVEMENTS);
    },

    // Lấy thông tin chuỗi ngày (streak)
    getStreak: () => {
        return axiosClient.get(API_ENDPOINTS.GAME.STREAK);
    },

    // Nhận thưởng
    claimReward: (rewardId) => {
        return axiosClient.post(`${API_ENDPOINTS.GAME.REWARDS}/${rewardId}/claim`);
    },
};

export default gameService;
