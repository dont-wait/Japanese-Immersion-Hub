import { Target, CheckCircle } from 'lucide-react'

/**
 * Component mục tiêu hàng ngày
 */
export default function DailyGoalCard({ target = 50, current = 0 }) {
  const progress = Math.min((current / target) * 100, 100)
  const completed = current >= target

  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        completed
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
          : 'bg-white dark:bg-[#262640] border-gray-200 dark:border-gray-700'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {completed ? (
            <CheckCircle size={20} className="text-green-500" />
          ) : (
            <Target size={20} className="text-[#8B5CF6]" />
          )}
          <h3 className="text-sm font-semibold">Daily Goal</h3>
        </div>
        <span className="text-lg font-bold">
          {current} / {target} XP
        </span>
      </div>
      <div className="w-full h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            completed ? 'bg-green-500' : 'bg-gradient-to-r from-[#8B5CF6] to-[#DB2777]'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {completed && (
        <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium">
          🎉 Goal completed! Great job!
        </p>
      )}
    </div>
  )
}
