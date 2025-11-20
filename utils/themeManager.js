// utils/themeManager.js
import { createContext } from "react";

export const ThemeContext = createContext({
  themeName: "Classic",
  setThemeName: () => {},
  theme: {},
});
