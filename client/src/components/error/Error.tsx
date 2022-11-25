import { BiError } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import styles from "./Error.module.scss";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["container"]}>
      <div className={styles["text"]}>
        <BiError className={styles["icon"]} size={25} />
        Oops, something went wrong!
      </div>
      <div>An unknown error occurred. Please try again later.</div>
      <button className={styles["button"]} onClick={() => navigate("/contact")}>
        Contact Support
      </button>
    </div>
  );
};

export default Error;
