import {
  FaBasketballBall,
  FaCalendarCheck,
  FaClock,
  FaRegTrashAlt,
} from "react-icons/fa";
import { UserAuth } from "../../context/AuthContext";
import { Moment } from "moment";
import axios from "axios";
import styles from "./Reservation.module.scss";

const Reservation = ({
  courtType,
  courtNum,
  day,
  start,
  end,
  enableDelete,
  setLoading,
}: {
  courtType: string;
  courtNum: string;
  day: Moment;
  start: Moment;
  end: Moment;
  enableDelete?: boolean;
  setLoading?: (val: boolean) => void;
}) => {
  const auth = UserAuth();

  const onDelete = async () => {
    if (auth) {
      await axios
        .delete(
          `${process.env.REACT_APP_API_URL}/delete/reservation/${auth.uid}`,
          {
            data: {
              date: day.format("DD MM YYYY"),
              start: start.format("h:mm a"),
              end: end.format("h:mm a"),
              courtType: courtType,
              courtNum: courtNum,
            },
          }
        )
        .then(() => {
          if (setLoading) {
            setLoading(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
          <FaRegTrashAlt
            className={styles["trash"]}
            size={15}
            onClick={() => onDelete()}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Reservation;
