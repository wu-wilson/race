import styles from "./BinaryToggle.module.scss";

const BinaryToggle = ({
  option1,
  option2,
  option,
  setOption,
  width,
}: {
  option1: string;
  option2: string;
  option: string;
  setOption: (val: string) => void;
  width: number;
}) => {
  return (
    <div className={styles["container"]} style={{ width: width }}>
      <span
        className={`${styles["left-tab"]} ${
          option === option1 ? styles["selected"] : ""
        }`}
        onClick={() => setOption(option1)}
      >
        {option1}
      </span>
      <span
        className={`${styles["right-tab"]} ${
          option === option2 ? styles["selected"] : ""
        }`}
        onClick={() => setOption(option2)}
      >
        {option2}
      </span>
    </div>
  );
};

export default BinaryToggle;
