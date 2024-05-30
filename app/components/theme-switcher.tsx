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
        className="sr-only"
      >
        Theme
      </label>
      <select
        id="theme"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="w-40 px-2 py-2 rounded-md select"
      >
        <option value="system">
          System
        </option>
        <option value="dark">
          Dark
        </option>
        <option value="light">
          Light
        </option>
      </select>
    </div>
  );
};

export default ThemeSwitch;
