import { Moment } from "moment";
import { useEffect, useState } from "react";
import LoaderMessage from "../../../../components/loader-message/LoaderMessage";
import styles from "./Step2.module.scss";

type timeSlot = {
  start: Moment;
  end: Moment;
};

const temp: timeSlot[] = [];

const Step2 = ({ day }: { day: Moment }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [unavailable, setUnavailable] = useState<timeSlot[]>([]);

  const getReservedSlots = async () => {
    setUnavailable(temp);
  };

  useEffect(() => {
    setLoading(false);
  }, [JSON.stringify(unavailable)]);

  useEffect(() => {
    getReservedSlots();
  }, []);

  return (
    <div className={styles["container"]}>
      {loading ? <LoaderMessage message={"Fetching time slots..."} /> : null}
    </div>
  );
};

export default Step2;
