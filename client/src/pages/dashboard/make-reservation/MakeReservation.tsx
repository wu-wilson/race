import { useState, useEffect } from "react";
import moment, { Moment } from "moment";
import StepProgressBar from "../../../components/step-progress-bar/StepProgressBar";
import Step1 from "./step1/Step1";
import Step2 from "./step2/Step2";
import Step3 from "./step3/Step3";
import styles from "./MakeReservation.module.scss";
import { courtTypes, getCourts } from "./step2/courts";

const progressDescriptions = ["Date", "Time", "Review"];

const MakeReservation = () => {
  // Selected Day
  const [day, setDay] = useState<Moment>(moment());

  // Selected Court
  const [courtType, setCourtType] = useState<string>(courtTypes[0]);
  const [courtNum, setCourtNum] = useState<string>(getCourts(courtType)[0]);

  // Selected Time
  const [start, setStart] = useState<Moment | null>(null);
  const [end, setEnd] = useState<Moment | null>(null);

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

  useEffect(() => {
    if (step < 3 && start && end) {
      setStart(null);
      setEnd(null);
    }
  }, [step]);

  const submit = () => {
    setStep(progressDescriptions.length + 1);
  };

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
      {step === 2 ? (
        <Step2
          day={day}
          courtType={courtType}
          setCourtType={setCourtType}
          courtNum={courtNum}
          setCourtNum={setCourtNum}
          start={start}
          setStart={setStart}
          end={end}
          setEnd={setEnd}
        />
      ) : null}
      {step === 3 && start && end ? (
        <Step3
          courtType={courtType}
          courtNum={courtNum}
          day={day}
          start={start}
          end={end}
        />
      ) : null}
      <div className={styles["buttons"]}>
        <button onClick={prevStep} disabled={step === 1}>
          Prev
        </button>
        {step === progressDescriptions.length ? (
          <button onClick={submit}>Submit</button>
        ) : (
          <button
            onClick={nextStep}
            disabled={step === 2 && !start && !end ? true : false}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default MakeReservation;
