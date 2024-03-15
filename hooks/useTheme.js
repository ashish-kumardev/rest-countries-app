import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export function useTheme() {
  const [isDark, setIsDark] = useContext(ThemeContext)
  console.log(isDark, typeof setIsDark)
  return [isDark, setIsDark]
}
