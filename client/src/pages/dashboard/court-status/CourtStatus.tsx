import { useState, useEffect } from "react";
import { courtTypes, getCourts } from "../make-reservation/step2/courts";
import { MdEmojiPeople } from "react-icons/md";
import axios from "axios";
import LoaderMessage from "../../../components/loader-message/LoaderMessage";
import Error from "../../../components/error/Error";
import Dropdown from "../../../components/dropdown/Dropdown";
import styles from "./CourtStatus.module.scss";

const CourtStatus = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [courtType, setCourtType] = useState<string>(courtTypes[0]);
  const [courtNum, setCourtNum] = useState<string>(getCourts(courtType)[0]);

  const [numPeople, setNumPeople] = useState<number | null>(null);

  const getCourtStatus = async () => {
    await axios
      .get(
        `${
          process.env.REACT_APP_API_URL
        }/court-status/count/${courtType}/${courtNum.slice(-1)}`
      )
      .then((res) => {
        setError(false);
        const num: number = res.data[0]["num_people"];
        if (num === numPeople) {
          setLoading(false);
        } else {
          setNumPeople(res.data[0]["num_people"]);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (numPeople !== null) {
      setLoading(false);
    }
  }, [numPeople]);

  useEffect(() => {
    if (loading) {
      getCourtStatus();
    }
  }, [loading]);

  useEffect(() => {
    setLoading(true);
  }, [courtType, courtNum]);

  return (
    <div className={styles["container"]}>
      {loading ? (
        <LoaderMessage message="Fetching court status..." />
      ) : error ? (
        <Error />
      ) : (
        <>
          <div className={styles["dropdowns"]}>
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
          <div className={styles["status-card"]}>
            <div className={styles["description"]}>
              <MdEmojiPeople className={styles["icon"]} size={25} />
              {`${numPeople} player${
                numPeople && numPeople > 1 ? "s" : ""
              } on the court`}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourtStatus;
