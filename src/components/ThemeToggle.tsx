"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  const handleToggle = () => {
    const root = window.document.documentElement;
    const isDark = root.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      className="site-icon-button"
      onClick={handleToggle}
    >
      <Moon aria-hidden="true" className="h-5 w-5 dark:hidden" />
      <Sun aria-hidden="true" className="hidden h-5 w-5 dark:block" />
    </button>
  );
}
