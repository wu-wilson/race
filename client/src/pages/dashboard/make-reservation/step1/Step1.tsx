import { useState, useEffect } from "react";
import { UserAuth } from "../../../../context/AuthContext";
import { BsStackOverflow } from "react-icons/bs";
import moment, { Moment } from "moment";
import axios from "axios";
import LoaderMessage from "../../../../components/loader-message/LoaderMessage";
import Calendar from "../../../../components/calendar/Calendar";
import styles from "./Step1.module.scss";

const Step1 = ({
  day,
  setDay,
  setSelectedTab,
}: {
  day: Moment;
  setDay: (day: Moment) => void;
  setSelectedTab: (tab: string) => void;
}) => {
  const user = UserAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [maxReached, setMaxReached] = useState<boolean>(false);

  const checkNumReservations = async () => {
    if (user) {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/bookings/${user.uid}`)
        .then((res) => {
          if (res.data.length >= 5) {
            setMaxReached(true);
          } else {
            setMaxReached(false);
          }
        })
        .catch((err) => {});
    }
  };

  useEffect(() => {
    if (loading) {
      checkNumReservations();
    }
  }, [loading]);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [maxReached]);

  return (
    <div className={styles["container"]}>
      {loading ? (
        <LoaderMessage message="Checking your reservation limit..." />
      ) : maxReached ? (
        <div className={styles["max"]}>
          <div className={styles["text"]}>
            <BsStackOverflow className={styles["icon"]} size={25} />
            Too many bookings
          </div>
          <div>It seems like you have more than 5 many bookings.</div>
          <div className={styles["buttons"]}>
            <button
              className={styles["button"]}
              onClick={() => setSelectedTab("My Bookings")}
            >
              Delete Bookings
            </button>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Step1;
