import { Theme, setTheme } from "../../context/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi";
import styles from "./ThemeToggle.module.scss";

const ThemeToggle = () => {
  const theme: setTheme | null = Theme();

  const changeTheme = () => {
    if (theme) {
      theme.setDarkMode(!theme.darkMode);
    }
  };

  return (
    <label className={styles["switch"]}>
      <input type="checkbox" onChange={changeTheme} />
      <span
        className={`${styles["slider"]} ${styles["round"]} ${
          theme && theme.darkMode ? styles["dark"] : ""
        }`}
      >
        <span
          className={`${styles["icons"]}`}
          style={{
            transform:
              theme && theme.darkMode ? "translateX(20px)" : "translateX(0px)",
          }}
        >
          {theme && theme.darkMode ? (
            <HiMoon className={styles["icon"]} />
          ) : (
            <HiSun className={styles["icon"]} />
          )}
        </span>
      </span>
    </label>
  );
};

export default ThemeToggle;
