import { Moment } from "moment";
import { useEffect, useState } from "react";
import { courtTypes, getCourts } from "./courts";
import TimeSelector, {
  timeSlot,
} from "../../../../components/time-selector/TimeSelector";
import Dropdown from "../../../../components/dropdown/Dropdown";
import LoaderMessage from "../../../../components/loader-message/LoaderMessage";
import styles from "./Step2.module.scss";

import moment from "moment";

const Step2 = ({
  day,
  courtType,
  setCourtType,
  courtNum,
  setCourtNum,
  start,
  setStart,
  end,
  setEnd,
}: {
  day: Moment;
  courtType: string;
  setCourtType: (type: string) => void;
  courtNum: string;
  setCourtNum: (num: string) => void;
  start: Moment | null;
  setStart: (val: Moment | null) => void;
  end: Moment | null;
  setEnd: (val: Moment | null) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [unavailable, setUnavailable] = useState<timeSlot[]>([]);

  const updateReservedSlots = () => {
    setUnavailable([
      {
        start: moment(
          `${day.clone().format("DD MM YYYY")} 9:15 am`,
          "DD MM YYYY h:mm a"
        ),
        end: moment(
          `${day.clone().format("DD MM YYYY")} 10:15 am`,
          "DD MM YYYY h:mm a"
        ),
        available: false,
      },
      {
        start: moment(
          `${day.clone().format("DD MM YYYY")} 1:00 pm`,
          "DD MM YYYY h:mm a"
        ),
        end: moment(
          `${day.clone().format("DD MM YYYY")} 2:30 pm`,
          "DD MM YYYY h:mm a"
        ),
        available: false,
      },
    ]);
  };

  useEffect(() => {
    if (loading) {
      updateReservedSlots();
    }
  }, [loading]);

  useEffect(() => {
    setLoading(false);
  }, [unavailable]);

  useEffect(() => {
    setLoading(true);
  }, [courtType, courtNum]);

  return (
    <div className={styles["container"]}>
      {loading ? (
        <LoaderMessage message={"Fetching time slots..."} />
      ) : (
        <div className={styles["dd-selector"]}>
          <div className={styles["dd-text"]}>
            <span className={styles["text"]}>
              <span className={styles["direction"]}>
                Select Your Reservation Time
              </span>
              <span className={styles["subtext"]}>
                Click and drag to select a time slot
              </span>
              <div className={styles["dd-container"]}>
                <div className={styles["dd"]}>
                  Type
                  <Dropdown
                    options={courtTypes}
                    value={courtType}
                    setValue={setCourtType}
                    width={150}
                  />
                </div>
                <div className={styles["dd"]}>
                  Court #
                  <Dropdown
                    options={getCourts(courtType)}
                    value={courtNum}
                    setValue={setCourtNum}
                    width={150}
                  />
                </div>
              </div>
              <span className={styles["key"]}>
                <div className={styles["slot"]} /> {`   =   Available`}
              </span>
              <span className={styles["key"]}>
                <div className={styles["selected"]} /> {`   =   Selected`}
              </span>
              <span className={styles["key"]}>
                <div className={styles["unavailable"]} /> {`   =   Unavailable`}
              </span>
            </span>
          </div>
          <div className={styles["ts-container"]}>
            <TimeSelector
              day={day}
              unavailable={unavailable}
              start={start}
              setStart={setStart}
              end={end}
              setEnd={setEnd}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2;
