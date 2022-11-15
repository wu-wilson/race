import {
  FaBasketballBall,
  FaCalendarCheck,
  FaClock,
  FaRegTrashAlt,
} from "react-icons/fa";
import { Moment } from "moment";
import styles from "./Reservation.module.scss";

const Reservation = ({
  courtType,
  courtNum,
  day,
  start,
  end,
  enableDelete,
}: {
  courtType: string;
  courtNum: string;
  day: Moment;
  start: Moment;
  end: Moment;
  enableDelete?: boolean;
}) => {
  return (
    <div className={styles["container"]}>
      <span className={styles["description"]}>
        <FaBasketballBall className={styles["icon"]} size={15} />
        <span className={styles["label"]}>
          {courtType} {courtNum}
        </span>
      </span>
      <span className={styles["description"]}>
        <FaCalendarCheck className={styles["icon"]} size={15} />
        <span className={styles["label"]}>
          {day.format("dddd, MMM D, YYYY")}
        </span>
      </span>
      <div className={styles["bottom"]}>
        <span className={styles["description"]}>
          <FaClock className={styles["icon"]} size={15} />
          <span className={styles["label"]}>
            {start.format("h:mm A")} - {end.format("h:mm A")}
          </span>
        </span>
        {enableDelete ? (
          <FaRegTrashAlt className={styles["trash"]} size={15} />
        ) : null}
      </div>
    </div>
  );
};

export default Reservation;
