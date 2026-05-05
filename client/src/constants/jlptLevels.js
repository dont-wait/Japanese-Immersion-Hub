// ===== JLPT Levels =====
export const JLPT_LEVELS = {
  N5: { value: 'N5', label: 'N5 - Beginner', color: '#86EFAC', order: 1 },
  N4: { value: 'N4', label: 'N4 - Elementary', color: '#0EA5E9', order: 2 },
  N3: { value: 'N3', label: 'N3 - Intermediate', color: '#FBBF24', order: 3 },
  N2: { value: 'N2', label: 'N2 - Upper Intermediate', color: '#F97316', order: 4 },
  N1: { value: 'N1', label: 'N1 - Advanced', color: '#EF4444', order: 5 },
}

export const JLPT_LEVEL_LIST = Object.values(JLPT_LEVELS).sort((a, b) => a.order - b.order)
