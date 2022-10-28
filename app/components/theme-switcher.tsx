"use client";

import { useState, useEffect } from "react";
import { useTheme, ThemeProvider } from "next-themes";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div aria-hidden>
      <label
        htmlFor="theme"
        className="pr-2 ml-2 text-gray-900 dark:text-gray-100"
      >
        Theme
      </label>
      <select
        id="theme"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="w-40 h-8 bg-gray-100 rounded-md select select-bordered dark:bg-gray-900"
      >
        <option value="system" className="text-gray-900 dark:text-gray-100">
          System
        </option>
        <option value="dark" className="text-gray-900 dark:text-gray-100">
          Dark
        </option>
        <option value="light" className="text-gray-900 dark:text-gray-100">
          Light
        </option>
      </select>
    </div>
  );
};

export default () => <ThemeProvider
    attribute="class"
    cookieName="maxleitercom-theme"
    defaultTheme="dark"
    value={{
      light: "light",
      dark: "dark",
    }}
  >
    <ThemeSwitch />
  </ThemeProvider>;
