import { ClockLoader } from "react-spinners";
import { Theme, setTheme } from "../../context/ThemeContext";
import styles from "./LoaderMessage.module.scss";

const LoaderMessage = ({ message }: { message: string }) => {
  const theme: setTheme | null = Theme();

  return (
    <div className={styles["container"]}>
      <ClockLoader
        color={theme && theme.darkMode ? "white" : "black"}
        cssOverride={{ transition: "ease-in fill 10000ms" }}
        size={100}
      />
      <span className={styles["message"]}>{message}</span>
    </div>
  );
};

export default LoaderMessage;
