import { useLocalStorage } from './useLocalStorage';
import { useEffect } from 'react';
export function useTheme() {
  const [theme, setTheme] = useLocalStorage('portfolio_theme', 'dark');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return { theme, setTheme, toggleTheme };
}
