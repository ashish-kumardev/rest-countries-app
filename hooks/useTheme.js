import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export function useTheme() {
  return ([isDark, setIsDark] = useContext(ThemeContext));
  // return [isDark, setIsDark]
  // console.log(isDark, typeof setIsDark)
}
