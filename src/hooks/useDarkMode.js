import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return { darkMode, setDarkMode };
}
// Controlează dark mode și îl salvează pentru utilizator
// salvează în localStorage
// adaugă sau scoate clasa dark din <html>
// Tailwind folosește .dark pe <html> și schimbă automat culorile
// state (darkMode)
// localStorage
// class dark pe html
