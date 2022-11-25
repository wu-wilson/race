import { Moment } from "moment";
import { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { UserAuth } from "../../../../context/AuthContext";
import Error from "../../../../components/error/Error";
import axios from "axios";
import LoaderMessage from "../../../../components/loader-message/LoaderMessage";
import styles from "./Submission.module.scss";

const Submission = ({
  courtType,
  courtNum,
  day,
  start,
  end,
  setSelectedTab,
  reset,
}: {
  courtType: string;
  courtNum: string;
  day: Moment;
  start: Moment;
  end: Moment;
  setSelectedTab: (tab: string) => void;
  reset: () => void;
}) => {
  const user = UserAuth();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const makeReservation = async () => {
    if (user) {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/reserve`, {
          uid: user.uid,
          courtType: courtType,
          courtNum: courtNum,
          date: day.format("DD MM YYYY"),
          start: start.format("h:mm a"),
          end: end.format("h:mm a"),
        })
        .then(() => {
          setError(false);
          setSubmitting(false);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          setSubmitting(false);
        });
    }
  };

  useEffect(() => {
    if (submitting) {
      makeReservation();
    }
  }, [submitting]);

  useEffect(() => {
    setSubmitting(true);
  }, []);

  return (
    <div className={styles["container"]}>
      {submitting ? (
        <LoaderMessage message={"Making Reservation..."} />
      ) : error ? (
        <Error />
      ) : (
        <>
          <div className={styles["text"]}>
            <AiFillCheckCircle className={styles["icon"]} size={25} /> Booking
            Success!
          </div>
          <div>Your reservation has been added to our system.</div>
          <div className={styles["buttons"]}>
            <button
              className={styles["button"]}
              onClick={() => setSelectedTab("My Bookings")}
            >
              View Booking
            </button>
            <button className={styles["button"]} onClick={() => reset()}>
              Make Another
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Submission;
