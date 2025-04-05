
import React, { createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  theme: string | undefined;
  toggleTheme: () => void;
};

const ThemeProviderContext = createContext<ThemeContextType>({
  theme: undefined,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    
    // Apply smooth transition class when theme changes
    document.documentElement.classList.add('transition-colors');
    document.documentElement.classList.add('duration-300');
    
    return () => {
      document.documentElement.classList.remove('transition-colors');
      document.documentElement.classList.remove('duration-300');
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProviderContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeProviderContext);
