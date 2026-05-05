/**
 * Component hiển thị Kanji lớn với thông tin chi tiết
 */
export default function BigKanjiBox({ kanji, reading, meaning, strokeCount, jlptLevel }) {
  return (
    <div className="flex flex-col items-center p-8 rounded-2xl bg-white dark:bg-[#262640] shadow-lg border border-gray-200 dark:border-gray-700">
      <span className="text-7xl md:text-8xl font-jp font-bold text-[#8B5CF6] mb-4">{kanji}</span>
      <div className="text-lg font-jp text-gray-600 dark:text-gray-300 mb-2">{reading}</div>
      <div className="text-base text-gray-800 dark:text-gray-200 font-medium mb-4">{meaning}</div>
      <div className="flex items-center gap-4 text-xs text-gray-400">
        {strokeCount && <span>🖌️ {strokeCount} strokes</span>}
        {jlptLevel && (
          <span className="px-2 py-0.5 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] font-medium">
            {jlptLevel}
          </span>
        )}
      </div>
    </div>
  )
}
