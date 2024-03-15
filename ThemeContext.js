import { createContext, useState } from "react";

// const [isDark, setIsDark] = useState(
//   JSON.parse(localStorage.getItem("isDark"))
// );
export const ThemeContext = createContext()

export function ThemeProvider({children}){
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark"))
  );

  return <ThemeContext.Provider value={[isDark, setIsDark]}>{children}</ThemeContext.Provider>
}