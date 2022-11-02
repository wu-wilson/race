import { useState } from "react";
import StepProgressBar from "../../../components/step-progress-bar/StepProgressBar";
import styles from "./MakeReservation.module.scss";

const progressDescriptions = ["Date", "Time", "Party", "Review"];

const MakeReservation = () => {
  const [step, setStep] = useState<number>(3);

  return (
    <div className={styles["container"]}>
      <StepProgressBar
        numSteps={4}
        step={step}
        descriptions={progressDescriptions}
      />
    </div>
  );
};

export default MakeReservation;
