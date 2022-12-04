import { useState, useEffect } from "react";
import { courtTypes, getCourts } from "../make-reservation/step2/courts";
import { FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";
import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import { capacity } from "../make-reservation/step2/courts";
import moment from "moment";
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
  const [closestReservation, setClosestReservation] = useState<string | null>(
    null
  );

  const getCourtStatus = async () => {
    const day = moment();
    await axios
      .all([
        axios.get(
          `${process.env.REACT_APP_API_URL}/count/${courtType}/${courtNum.slice(
            -1
          )}`
        ),
        axios.get(
          `${
            process.env.REACT_APP_API_URL
          }/booked/${courtType}/${courtNum}/${day.format("DD")}/${day.format(
            "MM"
          )}/${day.format("YYYY")}`
        ),
      ])
      .then((res) => {
        setError(false);
        const num: number = res[0].data[0]["num_people"];
        res[1].data.sort(
          (a: { [key: string]: string }, b: { [key: string]: string }) => {
            if (moment(a.end, "h:mm a").isBefore(moment(b.end, "h:mm a"))) {
              return -1;
            }
            if (moment(a.end, "h:mm a").isAfter(moment(b.end, "h:mm a"))) {
              return 1;
            }
            return 0;
          }
        );
        let close: string = "unset";
        let lastEnd = null;
        for (let i = 0; i < res[1].data.length; i++) {
          const data = res[1].data[i];
          const start = moment(
            `${data.date} ${data.start}`,
            "DD MM YYYY h:mm a"
          );
          const end = moment(`${data.date} ${data.end}`, "DD MM YYYY h:mm a");
          if (lastEnd === null && moment().isBetween(start, end, "minutes")) {
            lastEnd = end;
          } else if (lastEnd && lastEnd.format("h:mm a") === data.start) {
            lastEnd = end;
          }
        }
        if (lastEnd) {
          close = lastEnd.format("DD MM YYYY h:mm a");
        }
        if (num === numPeople && close === closestReservation) {
          setLoading(false);
        } else {
          setNumPeople(res[0].data[0]["num_people"]);
          setClosestReservation(close);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (numPeople !== null && closestReservation !== null) {
      setLoading(false);
    }
  }, [numPeople, closestReservation]);

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
          <div
            className={styles["status"]}
            style={{
              color:
                numPeople && capacity[courtType] <= numPeople ? "red" : "green",
            }}
          >{`${courtType} ${courtNum} is ${
            numPeople && capacity[courtType] <= numPeople ? "Full" : "Not Full"
          }`}</div>
          <div className={styles["status-card"]}>
            <div className={styles["description"]}>
              <BsFillPersonFill className={styles["icon"]} size={15} />
              {`${numPeople} player${
                (numPeople && numPeople > 1) || numPeople === 0 ? "s" : ""
              } on the court`}
            </div>
            <div className={styles["description"]}>
              <BsFillPeopleFill className={styles["icon"]} size={15} />
              {`Max ${capacity[courtType]} person capacity`}
            </div>
            <div className={styles["description"]}>
              {closestReservation === "unset" ? (
                <FaCalendarTimes className={styles["icon"]} size={15} />
              ) : (
                <FaCalendarCheck className={styles["icon"]} size={15} />
              )}
              {closestReservation === "unset"
                ? "Court is currently unreserved"
                : `Reserved until ${moment(
                    closestReservation,
                    "DD MM YYYY h:mm a"
                  ).format("h:mm a")}`}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourtStatus;
