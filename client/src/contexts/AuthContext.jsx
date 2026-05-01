import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Kiểm tra trạng thái đăng nhập khi mount
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = useCallback(async (credentials) => {
        const { data } = await authService.login(credentials);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return data;
    }, []);

    const register = useCallback(async (userData) => {
        const { data } = await authService.register(userData);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return data;
    }, []);

    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } catch {
            // Ignore logout API error
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            setUser(null);
        }
    }, []);

    const loginAsGuest = useCallback(() => {
        const guestUser = {
            id: 'guest',
            username: 'guest_warrior',
            displayName: 'Khách Tham Quan',
            role: 'LEARNER',
            totalXp: 0,
            isGuest: true
        };
        localStorage.setItem('accessToken', 'guest-token');
        localStorage.setItem('user', JSON.stringify(guestUser));
        setUser(guestUser);
    }, []);

    const updateUser = useCallback((updatedData) => {
        setUser((prev) => {
            const newUser = { ...prev, ...updatedData };
            localStorage.setItem('user', JSON.stringify(newUser));
            return newUser;
        });
    }, []);

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
        isCreator: user?.role === 'CREATOR' || user?.role === 'ADMIN',
        login,
        register,
        loginAsGuest,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
