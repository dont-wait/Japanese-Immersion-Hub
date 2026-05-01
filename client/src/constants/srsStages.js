// ===== SRS Stages (FSRS-inspired) =====
export const SRS_STAGES = {
    NEW: { value: 0, label: 'New', color: '#94A3B8', icon: '🆕' },
    LEARNING: { value: 1, label: 'Learning', color: '#F97316', icon: '📖' },
    REVIEW: { value: 2, label: 'Review', color: '#0EA5E9', icon: '🔄' },
    GRADUATED: { value: 3, label: 'Graduated', color: '#16A34A', icon: '✅' },
    BURNED: { value: 4, label: 'Burned', color: '#FBBF24', icon: '🔥' },
    SUSPENDED: { value: -1, label: 'Suspended', color: '#6B7280', icon: '⏸️' },
};

// ===== Card Grades (Đánh giá khi review thẻ) =====
export const CARD_GRADES = {
    AGAIN: { value: 1, label: 'Again', shortcut: '1', color: '#EF4444', description: 'Quên hoàn toàn' },
    HARD: { value: 2, label: 'Hard', shortcut: '2', color: '#F97316', description: 'Nhớ nhưng khó khăn' },
    GOOD: { value: 3, label: 'Good', shortcut: '3', color: '#0EA5E9', description: 'Nhớ được' },
    EASY: { value: 4, label: 'Easy', shortcut: '4', color: '#16A34A', description: 'Quá dễ!' },
};

export const CARD_GRADE_LIST = Object.values(CARD_GRADES);
