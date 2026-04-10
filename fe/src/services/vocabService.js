import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '../config/api';

const vocabService = {
    // Tìm kiếm từ vựng
    search: (query, params = {}) => {
        return axiosClient.get(API_ENDPOINTS.VOCAB.SEARCH, {
            params: { q: query, ...params },
        });
    },

    // Lấy từ vựng theo ID
    getById: (id) => {
        return axiosClient.get(API_ENDPOINTS.VOCAB.BY_ID(id));
    },

    // Lấy từ vựng theo cấp độ JLPT
    getByJlpt: (level, params = {}) => {
        return axiosClient.get(API_ENDPOINTS.VOCAB.BY_JLPT(level), { params });
    },

    // Tạo từ vựng mới (Creator)
    create: (vocabData) => {
        return axiosClient.post(API_ENDPOINTS.VOCAB.BASE, vocabData);
    },

    // Cập nhật từ vựng (Creator)
    update: (id, vocabData) => {
        return axiosClient.put(API_ENDPOINTS.VOCAB.BY_ID(id), vocabData);
    },

    // Xóa từ vựng (Admin)
    delete: (id) => {
        return axiosClient.delete(API_ENDPOINTS.VOCAB.BY_ID(id));
    },

    // Import hàng loạt (Admin)
    bulkImport: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return axiosClient.post(API_ENDPOINTS.VOCAB.BULK_IMPORT, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};

export default vocabService;
