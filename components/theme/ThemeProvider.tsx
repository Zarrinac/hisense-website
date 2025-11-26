'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isReady: boolean;
};

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
};

const STORAGE_KEY = 'hisense-theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children, defaultTheme = 'light' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    /* eslint-disable react-hooks/set-state-in-effect */
    const root = document.documentElement;
    const storedTheme = window.localStorage.getItem(STORAGE_KEY) as Theme | null;

    if (storedTheme === 'light' || storedTheme === 'dark') {
      setThemeState(storedTheme);
      root.dataset.theme = storedTheme;
      setIsReady(true);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolvedTheme = prefersDark ? 'dark' : defaultTheme;
    setThemeState(resolvedTheme);
    root.dataset.theme = resolvedTheme;
    setIsReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [defaultTheme]);

  useEffect(() => {
    if (!isReady || typeof window === 'undefined') {
      return;
    }
    const root = document.documentElement;
    root.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, isReady]);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      isReady,
    }),
    [theme, setTheme, toggleTheme, isReady],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
