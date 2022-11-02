import styles from "./StepProgressBar.module.scss";

const StepProgressBar = ({
  numSteps,
  step,
  setStep,
}: {
  numSteps: number;
  step: number;
  setStep: (step: number) => void;
}) => {
  return (
    <div className={styles["container"]}>
      {Array.from({ length: numSteps }, (_, index) => index + 1).map((step) => (
        <div className={styles["circle"]} key={step}>
          {step}
        </div>
      ))}
    </div>
  );
};

export default StepProgressBar;
