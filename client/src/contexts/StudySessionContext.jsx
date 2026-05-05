import { createContext, useContext, useState, useCallback } from 'react'

const StudySessionContext = createContext(null)

export function StudySessionProvider({ children }) {
  const [sessionActive, setSessionActive] = useState(false)
  const [currentCards, setCurrentCards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [sessionStats, setSessionStats] = useState({
    reviewed: 0,
    correct: 0,
    incorrect: 0,
    totalTime: 0,
    startTime: null,
  })

  const startSession = useCallback((cards) => {
    setCurrentCards(cards)
    setCurrentIndex(0)
    setIsFlipped(false)
    setSessionActive(true)
    setSessionStats({
      reviewed: 0,
      correct: 0,
      incorrect: 0,
      totalTime: 0,
      startTime: Date.now(),
    })
  }, [])

  const flipCard = useCallback(() => {
    setIsFlipped((prev) => !prev)
  }, [])

  const gradeCard = useCallback(
    (grade) => {
      setSessionStats((prev) => ({
        ...prev,
        reviewed: prev.reviewed + 1,
        correct: grade >= 3 ? prev.correct + 1 : prev.correct,
        incorrect: grade < 3 ? prev.incorrect + 1 : prev.incorrect,
      }))

      setIsFlipped(false)

      if (currentIndex < currentCards.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      } else {
        // Hết thẻ → kết thúc phiên
        setSessionStats((prev) => ({
          ...prev,
          totalTime: Math.round((Date.now() - prev.startTime) / 1000),
        }))
        setSessionActive(false)
      }

      return grade
    },
    [currentIndex, currentCards.length]
  )

  const endSession = useCallback(() => {
    setSessionStats((prev) => ({
      ...prev,
      totalTime: Math.round((Date.now() - prev.startTime) / 1000),
    }))
    setSessionActive(false)
    setCurrentCards([])
    setCurrentIndex(0)
    setIsFlipped(false)
  }, [])

  const value = {
    sessionActive,
    currentCards,
    currentCard: currentCards[currentIndex] || null,
    currentIndex,
    totalCards: currentCards.length,
    isFlipped,
    sessionStats,
    progress: currentCards.length > 0 ? ((currentIndex + 1) / currentCards.length) * 100 : 0,
    startSession,
    flipCard,
    gradeCard,
    endSession,
  }

  return <StudySessionContext.Provider value={value}>{children}</StudySessionContext.Provider>
}

export function useStudySession() {
  const context = useContext(StudySessionContext)
  if (!context) {
    throw new Error('useStudySession must be used within a StudySessionProvider')
  }
  return context
}

export default StudySessionContext
