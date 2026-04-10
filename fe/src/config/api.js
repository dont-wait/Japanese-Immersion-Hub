// ===== API Configuration =====
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

const API_ENDPOINTS = {
    // Auth
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        REFRESH: '/auth/refresh',
        LOGOUT: '/auth/logout',
        GOOGLE: '/auth/google',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
    },

    // Vocabulary
    VOCAB: {
        BASE: '/vocab',
        SEARCH: '/vocab/search',
        BY_ID: (id) => `/vocab/${id}`,
        BY_JLPT: (level) => `/vocab/jlpt/${level}`,
        BULK_IMPORT: '/vocab/bulk-import',
    },

    // SRS (Spaced Repetition System)
    SRS: {
        DUE_REVIEWS: '/srs/due',
        SUBMIT_REVIEW: '/srs/review',
        STATS: '/srs/stats',
        FORECAST: '/srs/forecast',
    },

    // Decks
    DECKS: {
        BASE: '/decks',
        BY_ID: (id) => `/decks/${id}`,
        CARDS: (deckId) => `/decks/${deckId}/cards`,
    },

    // Gamification
    GAME: {
        LEADERBOARD: '/game/leaderboard',
        XP: '/game/xp',
        DAILY_GOAL: '/game/daily-goal',
        ACHIEVEMENTS: '/game/achievements',
        STREAK: '/game/streak',
        REWARDS: '/game/rewards',
    },

    // User
    USER: {
        PROFILE: '/user/profile',
        SETTINGS: '/user/settings',
        STATS: '/user/stats',
    },

    // Admin
    ADMIN: {
        DASHBOARD: '/admin/dashboard',
        USERS: '/admin/users',
        AUDIT_LOGS: '/admin/audit-logs',
        SYSTEM: '/admin/system',
        CONTENT: '/admin/content',
    },

    // Dictionary
    DICTIONARY: {
        SEARCH: '/dictionary/search',
        KANJI: (char) => `/dictionary/kanji/${char}`,
        SENTENCE_EXAMPLES: (vocabId) => `/dictionary/sentences/${vocabId}`,
    },
};

export { API_BASE_URL, API_ENDPOINTS };
