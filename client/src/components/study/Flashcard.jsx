import { useState } from 'react'
import { Volume2 } from 'lucide-react'
import useAudio from '../../hooks/useAudio'

/**
 * Component Flashcard — lật thẻ trước/sau
 */
export default function Flashcard({ card, isFlipped, onFlip }) {
  const { play: playAudio } = useAudio(card?.audioUrl)

  if (!card) return null

  return (
    <div className="perspective-[1000px] w-full max-w-lg mx-auto cursor-pointer" onClick={onFlip}>
      <div
        className={`relative w-full min-h-[320px] transition-transform duration-600 transform-style-3d ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden rounded-2xl bg-white dark:bg-[#262640] shadow-xl border border-gray-200 dark:border-gray-700 p-8 flex flex-col items-center justify-center gap-4">
          <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
            {card.cardType || 'VOCAB'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-jp text-center">{card.front}</h2>
          {card.audioUrl && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                playAudio()
              }}
              className="mt-2 p-2.5 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20 transition-colors"
            >
              <Volume2 size={20} />
            </button>
          )}
          <p className="text-sm text-gray-400 mt-4">Tap to reveal</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded-2xl bg-gradient-to-br from-[#8B5CF6]/5 to-[#DB2777]/5 dark:from-[#8B5CF6]/10 dark:to-[#DB2777]/10 shadow-xl border border-[#8B5CF6]/20 p-8 flex flex-col items-center justify-center gap-3">
          <span className="text-xs uppercase tracking-wider text-[#8B5CF6] font-medium">
            Answer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-jp text-center">
            {card.reading || ''}
          </h2>
          <p className="text-xl text-center mt-2">{card.back}</p>
          {card.exampleSentence && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center italic font-jp">
              「{card.exampleSentence}」
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
