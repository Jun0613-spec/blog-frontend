import React, { useContext } from "react";
import { HiSun, HiMoon } from "react-icons/hi";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext)!;

  return (
    <>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="bg-neutral-400/20 text-neutral-600 p-2 rounded-lg dark:bg-neutral-400/40 dark:text-neutral-200 "
      >
        {theme === "dark" ? <HiSun /> : <HiMoon />}
      </button>
    </>
  );
};

export default ThemeToggle;
