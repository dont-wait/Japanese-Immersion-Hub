// ===== Theme Configuration =====
export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
};

export const THEME_COLORS = {
    light: {
        bg: '#FAF7F2',
        text: '#1E1B2E',
        card: '#FFFFFF',
        border: '#E2E8F0',
        accent: '#8B5CF6',
    },
    dark: {
        bg: '#1A1A2E',
        text: '#E2E8F0',
        card: '#262640',
        border: '#3B3B5C',
        accent: '#C4B5FD',
    },
};

export const getStoredTheme = () => {
    return localStorage.getItem('jhub-theme') || THEMES.LIGHT;
};

export const setStoredTheme = (theme) => {
    localStorage.setItem('jhub-theme', theme);
    if (theme === THEMES.DARK) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
};
