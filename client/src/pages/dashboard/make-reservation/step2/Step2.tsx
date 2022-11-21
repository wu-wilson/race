import { Moment } from "moment";
import { useEffect, useState } from "react";
import { courtTypes, getCourts } from "./courts";
import TimeSelector, {
  timeSlot,
} from "../../../../components/time-selector/TimeSelector";
import axios from "axios";
import moment from "moment";
import Dropdown from "../../../../components/dropdown/Dropdown";
import LoaderMessage from "../../../../components/loader-message/LoaderMessage";
import styles from "./Step2.module.scss";

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

  const [unavailable, setUnavailable] = useState<timeSlot[] | null>(null);

  const updateReservedSlots = async () => {
    await axios
      .get(
        `${
          process.env.REACT_APP_API_URL
        }/booked/${courtType}/${courtNum}/${day.format("DD")}/${day.format(
          "MM"
        )}/${day.format("YYYY")}`
      )
      .then((res) => {
        let reserved: timeSlot[] = [];
        for (let i = 0; i < res.data.length; i++) {
          const data = res.data[i];
          reserved.push({
            start: moment(`${data.date} ${data.start}`, "DD MM YYYY h:mm a"),
            end: moment(`${data.date} ${data.end}`, "DD MM YYYY h:mm a"),
            available: false,
          });
        }
        setUnavailable(reserved);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (loading) {
      updateReservedSlots();
    }
  }, [loading]);

  useEffect(() => {
    if (unavailable) {
      setLoading(false);
    }
  }, [JSON.stringify(unavailable)]);

  useEffect(() => {
    setLoading(true);
  }, [courtType, courtNum]);

  return (
    <div className={styles["container"]}>
      {loading ? (
        <LoaderMessage message={"Fetching time slots..."} />
      ) : unavailable ? (
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
      ) : null}
    </div>
  );
};

export default Step2;
