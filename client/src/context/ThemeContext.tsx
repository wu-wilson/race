import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

export type setTheme = {
  darkMode: boolean | null;
  setDarkMode: (val: boolean) => void;
};

// Create theme context
const ThemeContext = createContext<setTheme | null>(null);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    const storedDark = localStorage.getItem("dark_mode");
    if (storedDark) {
      setDarkMode(JSON.parse(storedDark));
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode != null) {
      localStorage.setItem("dark_mode", JSON.stringify(darkMode));
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const Theme = () => {
  return useContext(ThemeContext);
};
