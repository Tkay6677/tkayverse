import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const themes = [
  'light', // Bright, clean
  'dark',  // Default, moody
  'neon',  // Glitchy, cyberpunk
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const randomTheme = savedTheme || themes[Math.floor(Math.random() * themes.length)];
      setTheme(randomTheme);
      localStorage.setItem('theme', randomTheme);
    }
  }, []);

  const switchTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const newTheme = themes[nextIndex];
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (!theme) return null; // Wait for client-side load

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      <div className={`theme-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}