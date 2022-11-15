import { Moment } from "moment";
import Reservation from "../../../../components/reservation/Reservation";
import styles from "./Step3.module.scss";

const Step3 = ({
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
  return (
    <div className={styles["container"]}>
      <span className={styles["direction"]}>Does this look correct?</span>
      <span className={styles["subtext"]}>
        Review your reservation details and submit
      </span>
      <Reservation
        courtType={courtType}
        courtNum={courtNum}
        day={day}
        start={start}
        end={end}
      />
    </div>
  );
};

export default Step3;
