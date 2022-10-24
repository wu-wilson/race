import { RiAlertLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Particles from "../../components/particles/Particles";
import vars from "../../index.module.scss";
import styles from "./Error.module.scss";

const Error = () => {
  const navigate = useNavigate();

  const dashboardRedirect = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Particles num={40} radius={6} color={vars["primary_color"]} />
      <div className={styles["container"]}>
        <div className={styles["card"]}>
          <div className={styles["title"]}>
            <RiAlertLine className={styles["icon"]} /> 404
          </div>
          <div className={styles["subtitle"]}>Oops! Something's missing...</div>
          <div className={styles["text"]}>
            We can't seem to find the page you're looking for. The page doesn't
            exist, isn't available, or loaded incorrectly.
          </div>
          <button className={styles["button"]} onClick={dashboardRedirect}>
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default Error;
