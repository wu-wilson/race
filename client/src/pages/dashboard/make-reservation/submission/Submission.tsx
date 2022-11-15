import { Moment } from "moment";
import { useEffect, useState } from "react";
import LoaderMessage from "../../../../components/loader-message/LoaderMessage";
import styles from "./Submission.module.scss";

const Submission = ({
  courtType,
  courtNum,
  day,
  start,
  end,
}: {
  courtType: string;
  courtNum: string;
  day: Moment;
  start: Moment;
  end: Moment;
}) => {
  const [submitting, setSubmitting] = useState<boolean>(true);

  const makeReservation = () => {};

  useEffect(() => {
    makeReservation();
  }, []);

  return (
    <div className={styles["container"]}>
      {submitting ? <LoaderMessage message={"Making Reservation..."} /> : null}
    </div>
  );
};

export default Submission;
