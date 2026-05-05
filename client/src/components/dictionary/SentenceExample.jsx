import AudioPlayer from '../study/AudioPlayer'

/**
 * Component hiển thị câu ví dụ
 */
export default function SentenceExample({ sentence }) {
  if (!sentence) return null

  return (
    <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#1A1A2E] border border-gray-200 dark:border-gray-700">
      <p className="text-lg font-jp leading-8 mb-2">{sentence.japanese}</p>
      {sentence.reading && <p className="text-sm font-jp text-gray-400 mb-2">{sentence.reading}</p>}
      <p className="text-sm text-gray-600 dark:text-gray-300">{sentence.translation}</p>
      <div className="flex items-center justify-between mt-3">
        {sentence.audioUrl && <AudioPlayer src={sentence.audioUrl} />}
        {sentence.source && (
          <span className="text-xs text-gray-400 italic">📖 {sentence.source}</span>
        )}
      </div>
    </div>
  )
}
