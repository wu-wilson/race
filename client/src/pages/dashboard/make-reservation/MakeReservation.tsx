import { useState } from "react";
import moment, { Moment } from "moment";
import StepProgressBar from "../../../components/step-progress-bar/StepProgressBar";
import Step1 from "./step1/Step1";
import Step2 from "./step2/Step2";
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

  const [day, setDay] = useState<Moment>(moment());

  return (
    <div className={styles["container"]}>
      <div className={styles["progress"]}>
        <StepProgressBar
          numSteps={progressDescriptions.length}
          step={step}
          descriptions={progressDescriptions}
        />
      </div>
      {step === 1 ? <Step1 day={day} setDay={setDay} /> : null}
      {step === 2 ? <Step2 /> : null}
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
