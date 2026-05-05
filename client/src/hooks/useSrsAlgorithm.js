import { useState, useEffect, useCallback } from 'react'
import srsService from '../services/srsService'

/**
 * Hook quản lý logic SRS phía client
 */
export function useSrsAlgorithm() {
  const [dueCards, setDueCards] = useState([])
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState(null)

  const fetchDueCards = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await srsService.getDueReviews()
      setDueCards(data)
    } catch (error) {
      console.error('Failed to fetch due cards:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const submitGrade = useCallback(async (cardId, grade, timeSpent) => {
    try {
      const { data } = await srsService.submitReview({ cardId, grade, timeSpent })
      // Xóa card đã đánh giá khỏi danh sách
      setDueCards((prev) => prev.filter((c) => c.id !== cardId))
      return data
    } catch (error) {
      console.error('Failed to submit review:', error)
      throw error
    }
  }, [])

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await srsService.getStats()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch SRS stats:', error)
    }
  }, [])

  useEffect(() => {
    fetchDueCards()
    fetchStats()
  }, [fetchDueCards, fetchStats])

  return {
    dueCards,
    dueCount: dueCards.length,
    loading,
    stats,
    fetchDueCards,
    submitGrade,
    fetchStats,
  }
}

export default useSrsAlgorithm
