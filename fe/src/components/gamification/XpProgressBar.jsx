/**
 * Component thanh XP Progress
 */
export default function XpProgressBar({ currentXp, xpToNext, level, progress }) {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-semibold text-[#8B5CF6]">
                    Lv.{level}
                </span>
                <span className="text-xs text-gray-400">
                    {currentXp} / {xpToNext} XP
                </span>
            </div>
            <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#DB2777] transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                />
            </div>
        </div>
    );
}
