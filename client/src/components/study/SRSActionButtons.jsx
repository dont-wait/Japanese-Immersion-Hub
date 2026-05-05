import { CARD_GRADE_LIST } from '../../constants'

/**
 * Component các nút đánh giá SRS (Again / Hard / Good / Easy)
 */
export default function SRSActionButtons({ onGrade, intervalPreviews, disabled = false }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
      {CARD_GRADE_LIST.map((grade) => (
        <button
          key={grade.value}
          onClick={() => onGrade(grade.value)}
          disabled={disabled}
          className="flex flex-col items-center gap-1 px-5 py-3 rounded-xl font-medium text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          style={{ backgroundColor: grade.color }}
        >
          <span className="text-sm font-semibold">{grade.label}</span>
          <span className="text-xs opacity-80">
            [{grade.shortcut}] {intervalPreviews?.[grade.label.toLowerCase()] || ''}
          </span>
        </button>
      ))}
    </div>
  )
}
