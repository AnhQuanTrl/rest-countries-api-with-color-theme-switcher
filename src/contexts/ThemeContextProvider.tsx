import useMediaQuery from "@/hooks/useMediaQuery";
import React from "react";
import { Theme, ThemeContext } from "./themeContext";

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const preferDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = React.useState<Theme>(preferDark ? "dark" : "light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export default ThemeContextProvider;
