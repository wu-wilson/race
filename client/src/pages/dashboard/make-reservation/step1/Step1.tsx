import moment, { Moment } from "moment";
import Calendar from "../../../../components/calendar/Calendar";
import styles from "./Step1.module.scss";

const Step1 = ({
  day,
  setDay,
}: {
  day: Moment;
  setDay: (day: Moment) => void;
}) => {
  return (
    <div className={styles["container"]}>
      <span className={styles["text"]}>
        <span className={styles["direction"]}>
          Select Your Reservation Date
        </span>
        <span className={styles["selection"]}>
          {day.format("MMMM D, YYYY (dddd)")}
        </span>
        <span className={styles["key"]}>
          <div className={styles["selected-day"]}>{day.format("D")}</div>{" "}
          {`   =   Selected Date`}
        </span>
        <span className={styles["key"]}>
          <div className={styles["today"]}>{moment().format("D")}</div>{" "}
          {`   =   Today's Date`}
        </span>
        <span className={styles["key"]}>
          <div className={styles["selectable"]}>16</div>{" "}
          {`   =   Selectable Date`}
        </span>
      </span>
      <Calendar selectedDay={day} setSelectedDay={setDay} />
    </div>
  );
};

export default Step1;
