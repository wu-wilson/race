import { useState } from "react";
import StepProgressBar from "../../../components/step-progress-bar/StepProgressBar";
import styles from "./MakeReservation.module.scss";

const progressDescriptions = ["Date", "Time", "Party", "Review"];

const MakeReservation = () => {
  const [step, setStep] = useState<number>(1);

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const nextStep = () => {
    if (step < progressDescriptions.length) {
      setStep(step + 1);
    }
  };

  const submit = () => {};

  return (
    <div className={styles["container"]}>
      <div className={styles["progress"]}>
        <StepProgressBar
          numSteps={progressDescriptions.length}
          step={step}
          descriptions={progressDescriptions}
        />
      </div>
      <div className={styles["cal-container"]}>Test</div>
      <div className={styles["buttons"]}>
        <button onClick={prevStep} disabled={step === 1}>
          Prev
        </button>
        {step === progressDescriptions.length ? (
          <button onClick={submit}>Submit</button>
        ) : (
          <button onClick={nextStep}>Next</button>
        )}
      </div>
    </div>
  );
};

export default MakeReservation;
