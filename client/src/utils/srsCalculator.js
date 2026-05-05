/**
 * SM-2 / FSRS Calculator (phiên bản đơn giản phía client)
 * Dùng để UI phản hồi nhanh trước khi server xác nhận
 */

const DEFAULT_EASE = 2.5
const MIN_EASE = 1.3

/**
 * Tính toán lịch ôn tập tiếp theo dựa trên grade
 * @param {Object} card - { interval, repetitions, easeFactor }
 * @param {number} grade - 1 (Again) | 2 (Hard) | 3 (Good) | 4 (Easy)
 * @returns {Object} - { interval, repetitions, easeFactor, nextReviewDate }
 */
export function calculateNextReview(card, grade) {
  let { interval = 0, repetitions = 0, easeFactor = DEFAULT_EASE } = card

  if (grade < 2) {
    // Again → reset
    repetitions = 0
    interval = 1 // 1 phút
  } else if (grade === 2) {
    // Hard
    interval = Math.max(1, Math.round(interval * 1.2))
    easeFactor = Math.max(MIN_EASE, easeFactor - 0.15)
  } else if (grade === 3) {
    // Good
    if (repetitions === 0) {
      interval = 1 // 1 ngày
    } else if (repetitions === 1) {
      interval = 6 // 6 ngày
    } else {
      interval = Math.round(interval * easeFactor)
    }
    repetitions += 1
    easeFactor = Math.max(MIN_EASE, easeFactor - 0.08 + 0.28 * (grade - 2))
  } else {
    // Easy
    if (repetitions === 0) {
      interval = 4
    } else {
      interval = Math.round(interval * easeFactor * 1.3)
    }
    repetitions += 1
    easeFactor = Math.max(MIN_EASE, easeFactor + 0.15)
  }

  const nextReviewDate = new Date()
  nextReviewDate.setDate(nextReviewDate.getDate() + interval)

  return {
    interval,
    repetitions,
    easeFactor: Math.round(easeFactor * 100) / 100,
    nextReviewDate: nextReviewDate.toISOString(),
  }
}

/**
 * Ước tính thời gian hiển thị tiếp theo cho mỗi nút đánh giá
 */
export function getIntervalPreviews(card) {
  return {
    again: formatInterval(calculateNextReview(card, 1).interval),
    hard: formatInterval(calculateNextReview(card, 2).interval),
    good: formatInterval(calculateNextReview(card, 3).interval),
    easy: formatInterval(calculateNextReview(card, 4).interval),
  }
}

function formatInterval(days) {
  if (days < 1) return '< 1m'
  if (days === 1) return '1d'
  if (days < 30) return `${days}d`
  if (days < 365) return `${Math.round(days / 30)}mo`
  return `${(days / 365).toFixed(1)}y`
}
