import { createContext, ReactNode, useContext, useState } from "react";

export type setTheme = {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
};

// Create theme context
const ThemeContext = createContext<setTheme | null>(null);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const Theme = () => {
  return useContext(ThemeContext);
};
