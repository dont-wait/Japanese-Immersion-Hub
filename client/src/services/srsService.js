import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '../config/api';

const srsService = {
    // Lấy danh sách thẻ cần ôn tập hôm nay
    getDueReviews: (params = {}) => {
        return axiosClient.get(API_ENDPOINTS.SRS.DUE_REVIEWS, { params });
    },

    // Gửi kết quả đánh giá thẻ (Again/Hard/Good/Easy)
    submitReview: (reviewData) => {
        // reviewData = { cardId, grade, timeSpent }
        return axiosClient.post(API_ENDPOINTS.SRS.SUBMIT_REVIEW, reviewData);
    },

    // Lấy thống kê SRS (số thẻ mới, đang học, đã tốt nghiệp...)
    getStats: () => {
        return axiosClient.get(API_ENDPOINTS.SRS.STATS);
    },

    // Lấy dự báo ôn tập các ngày tới
    getForecast: (days = 30) => {
        return axiosClient.get(API_ENDPOINTS.SRS.FORECAST, { params: { days } });
    },
};

export default srsService;
