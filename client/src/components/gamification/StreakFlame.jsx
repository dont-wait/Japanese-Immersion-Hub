/**
 * Component ngọn lửa Streak
 */
export default function StreakFlame({ days = 0, isActive = true }) {
    return (
        <div className="flex flex-col items-center gap-1">
            <span className={`text-4xl ${isActive ? 'animate-streak' : 'grayscale opacity-50'}`}>
                🔥
            </span>
            <span className="text-2xl font-bold">{days}</span>
            <span className="text-xs text-gray-400 uppercase tracking-wider">
                {days === 1 ? 'Day' : 'Days'}
            </span>
        </div>
    );
}
