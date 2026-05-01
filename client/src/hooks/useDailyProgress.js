import { useState, useEffect, useCallback } from 'react';
import gameService from '../services/gameService';

/**
 * Hook theo dõi tiến trình hàng ngày (Daily Goal, XP, Streak)
 */
export function useDailyProgress() {
    const [dailyGoal, setDailyGoal] = useState(null);
    const [xp, setXp] = useState(null);
    const [streak, setStreak] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProgress = useCallback(async () => {
        setLoading(true);
        try {
            const [goalRes, xpRes, streakRes] = await Promise.all([
                gameService.getDailyGoal(),
                gameService.getXp(),
                gameService.getStreak(),
            ]);
            setDailyGoal(goalRes.data);
            setXp(xpRes.data);
            setStreak(streakRes.data);
        } catch (error) {
            console.error('Failed to fetch daily progress:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProgress();
    }, [fetchProgress]);

    return {
        dailyGoal,
        xp,
        streak,
        loading,
        refreshProgress: fetchProgress,
    };
}

export default useDailyProgress;
