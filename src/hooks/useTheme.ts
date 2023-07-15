import { ThemeContext } from "@/contexts/themeContext";
import React from "react";

const useTheme = () => {
  const themeContext = React.useContext(ThemeContext);
  if (themeContext == null) {
    throw new Error("Must be used inside a ThemeContextProvider");
  }

  return themeContext;
};

export default useTheme;
