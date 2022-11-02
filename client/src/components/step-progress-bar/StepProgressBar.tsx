import styles from "./StepProgressBar.module.scss";

const StepProgressBar = ({
  numSteps,
  step,
  descriptions,
}: {
  numSteps: number;
  step: number;
  descriptions: string[];
}) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["progress-bar"]} />
      <div
        className={styles["progress"]}
        style={{ width: `${((step - 1) / (numSteps - 1)) * 100}%` }}
      />
      {Array.from({ length: numSteps }, (_, index) => index + 1).map(
        (num, index) => (
          <div
            className={`${styles["circle"]} ${
              num < step || num > numSteps
                ? styles["complete"]
                : num === step
                ? styles["active"]
                : styles["inactive"]
            }`}
            key={num}
          >
            {num}
            <span className={styles["description"]}>{descriptions[index]}</span>
          </div>
        )
      )}
    </div>
  );
};

export default StepProgressBar;
