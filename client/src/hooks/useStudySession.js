import { useContext } from 'react'
import StudySessionContext from '../contexts/StudySessionContext'

export function useStudySession() {
  const context = useContext(StudySessionContext)
  if (!context) {
    throw new Error('useStudySession must be used within a StudySessionProvider')
  }
  return context
}