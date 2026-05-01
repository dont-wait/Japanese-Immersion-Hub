import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { THEMES, getStoredTheme, setStoredTheme } from '../config/theme';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getStoredTheme);

    useEffect(() => {
        setStoredTheme(theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT));
    }, []);

    const value = {
        theme,
        isDark: theme === THEMES.DARK,
        toggleTheme,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export default ThemeContext;
