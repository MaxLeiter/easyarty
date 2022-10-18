import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

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
      <label htmlFor="theme" className="ml-2 text-gray-900 dark:text-gray-100 pr-2">
        Theme
      </label>
      <select
        id="theme"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="select select-bordered w-40 h-8 mt-4 bg-gray-100 dark:bg-gray-900 rounded-md"
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

export default ThemeSwitch;
