import { useState } from "react";
import StepProgressBar from "../../../components/step-progress-bar/StepProgressBar";
import styles from "./MakeReservation.module.scss";

const MakeReservation = () => {
  const [step, setStep] = useState<number>(0);

  return (
    <div className={styles["container"]}>
      <StepProgressBar numSteps={3} step={step} setStep={setStep} />
    </div>
  );
};

export default MakeReservation;
