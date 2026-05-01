/**
 * Mô hình dữ liệu (JS Doc Types)
 * Dùng để tham khảo cấu trúc dữ liệu từ API
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} username
 * @property {string} email
 * @property {string} displayName
 * @property {string} avatarUrl
 * @property {'LEARNER'|'CREATOR'|'ADMIN'} role
 * @property {number} totalXp
 * @property {number} level
 * @property {number} streakDays
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Vocab
 * @property {string} id
 * @property {string} word - Từ tiếng Nhật (Kanji)
 * @property {string} reading - Cách đọc (Hiragana)
 * @property {string} meaning - Nghĩa (Tiếng Việt / Anh)
 * @property {string} jlptLevel - N5/N4/N3/N2/N1
 * @property {string[]} partsOfSpeech - Từ loại
 * @property {string} audioUrl - URL file phát âm
 * @property {Sentence[]} exampleSentences
 * @property {string} createdBy
 */

/**
 * @typedef {Object} Sentence
 * @property {string} id
 * @property {string} japanese - Câu tiếng Nhật
 * @property {string} reading - Furigana
 * @property {string} translation - Dịch nghĩa
 * @property {string} audioUrl
 * @property {string} source - Nguồn (anime, manga, sách giáo khoa...)
 */

/**
 * @typedef {Object} Deck
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} jlptLevel
 * @property {number} cardCount
 * @property {number} dueCount
 * @property {string} createdBy
 * @property {boolean} isPublic
 */

/**
 * @typedef {Object} Card
 * @property {string} id
 * @property {string} deckId
 * @property {string} vocabId
 * @property {'VOCAB'|'SENTENCE'|'KANJI'} cardType
 * @property {string} front - Mặt trước (Câu hỏi)
 * @property {string} back - Mặt sau (Đáp án)
 * @property {number} interval - Khoảng cách ôn (ngày)
 * @property {number} repetitions - Số lần ôn
 * @property {number} easeFactor - Hệ số dễ
 * @property {string} nextReviewDate
 * @property {number} srsStage
 */

/**
 * @typedef {Object} DailyGoal
 * @property {number} target - Mục tiêu (VD: 50 XP)
 * @property {number} current - Đã đạt được
 * @property {boolean} completed - Đã hoàn thành chưa
 */

/**
 * @typedef {Object} Achievement
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} iconUrl
 * @property {boolean} unlocked
 * @property {string} unlockedAt
 */

export default {};
