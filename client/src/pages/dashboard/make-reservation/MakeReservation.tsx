import StepProgressBar from "../../../components/step-progress-bar/StepProgressBar";
import styles from "./MakeReservation.module.scss";

const MakeReservation = () => {
  return (
    <div className={styles["container"]}>
      <StepProgressBar />
    </div>
  );
};

export default MakeReservation;
