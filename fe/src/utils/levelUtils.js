/**
 * Tiện ích tính toán Level dựa trên tổng XP
 */

const LEVEL_CONFIG = {
    baseXp: 100,    // XP cần cho level 1
    multiplier: 1.5, // Hệ số tăng mỗi level
    maxLevel: 100,
};

/**
 * Tính XP cần thiết để đạt level nhất định
 */
export function xpForLevel(level) {
    return Math.floor(LEVEL_CONFIG.baseXp * Math.pow(LEVEL_CONFIG.multiplier, level - 1));
}

/**
 * Tính level hiện tại từ tổng XP
 */
export function calculateLevel(totalXp) {
    let level = 1;
    let xpAccumulated = 0;

    while (level < LEVEL_CONFIG.maxLevel) {
        const xpNeeded = xpForLevel(level);
        if (xpAccumulated + xpNeeded > totalXp) break;
        xpAccumulated += xpNeeded;
        level++;
    }

    return {
        level,
        currentXp: totalXp - xpAccumulated,
        xpToNext: xpForLevel(level),
        progress: ((totalXp - xpAccumulated) / xpForLevel(level)) * 100,
        totalXp,
    };
}

/**
 * Lấy badge/title dựa trên level
 */
export function getLevelTitle(level) {
    if (level >= 80) return { title: '言語の達人', badge: '🏆', tier: 'Master' };
    if (level >= 60) return { title: '上級者', badge: '💎', tier: 'Diamond' };
    if (level >= 40) return { title: '中級者', badge: '🥇', tier: 'Gold' };
    if (level >= 20) return { title: '初級者', badge: '🥈', tier: 'Silver' };
    if (level >= 10) return { title: '見習い', badge: '🥉', tier: 'Bronze' };
    return { title: '入門者', badge: '🌱', tier: 'Beginner' };
}
