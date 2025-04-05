
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeContext } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 dark:bg-gray-800/40 dark:hover:bg-gray-700/60 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-blue-600" />
      )}
    </Button>
  );
};
