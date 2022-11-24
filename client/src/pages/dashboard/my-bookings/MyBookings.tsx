import { useState, useEffect } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { BsFillEmojiFrownFill } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import moment, { Moment } from "moment";
import BinaryToggle from "../../../components/binary-toggle/BinaryToggle";
import LoaderMessage from "../../../components/loader-message/LoaderMessage";
import axios from "axios";
import Reservation from "../../../components/reservation/Reservation";
import styles from "./MyBookings.module.scss";

type booking = {
  courtType: string;
  courtNum: string;
  day: Moment;
  start: Moment;
  end: Moment;
};

const MyBookings = ({
  setSelectedTab,
}: {
  setSelectedTab: (tab: string) => void;
}) => {
  const auth = UserAuth();

  const [bookings, setBookings] = useState<booking[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const filterValues: string[] = ["Date & Time", "Court Type"];

  const [filter, setFilter] = useState<string>(filterValues[0]);

  const orderBookings = (list: booking[]) => {
    let orderedBookings = [...list];
    switch (filter) {
      case filterValues[0]:
        orderedBookings.sort((a, b) => {
          const aDT = moment(
            `${a.day.format("DD MM YYYY")} ${a.start.format("h:mm a")}`,
            "DD MM YYYY h:mm a"
          );
          const bDT = moment(
            `${b.day.format("DD MM YYYY")} ${b.start.format("h:mm a")}`,
            "DD MM YYYY h:mm a"
          );
          if (aDT.isBefore(bDT, "minute")) {
            return -1;
          }
          if (aDT.isAfter(bDT, "minute")) {
            return 1;
          }
          return 0;
        });
        break;
      case filterValues[1]:
        orderedBookings.sort((a, b) => {
          const aCT = a.courtType + a.courtNum;
          const bCT = b.courtType + b.courtNum;
          if (aCT < bCT) {
            return -1;
          }
          if (aCT > bCT) {
            return 1;
          }
          return 0;
        });
        break;
      default:
        break;
    }
    return orderedBookings;
  };

  const getBookings = async () => {
    if (auth) {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/bookings/${auth.uid}`)
        .then((res) => {
          let bookingList = [];
          for (let i = 0; i < res.data.length; i++) {
            const data = res.data[i];
            bookingList.push({
              courtType: data.courtType,
              courtNum: data.courtNum,
              day: moment(`${data.date}`, "DD MM YYYY"),
              start: moment(`${data.date} ${data.start}`, "DD MM YYYY h:mm a"),
              end: moment(`${data.date} ${data.end}`, "DD MM YYYY h:mm a"),
            });
          }
          setBookings(orderBookings(bookingList));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (loading) {
      getBookings();
    }
  }, [loading]);

  useEffect(() => {
    if (bookings !== null) {
      setLoading(false);
    }
  }, [JSON.stringify(bookings)]);

  useEffect(() => {
    if (bookings) {
      setBookings(orderBookings(bookings));
    }
  }, [filter]);

  return (
    <div className={styles["container"]}>
      {loading ? (
        <LoaderMessage message="Fetching bookings..." />
      ) : bookings ? (
        bookings.length === 0 ? (
          <div className={styles["no-reservations"]}>
            <div className={styles["title"]}>
              <BsFillEmojiFrownFill className={styles["icon"]} size={25} />
              No Reservations
            </div>
            <div className={styles["subtext"]}>
              It seems like you haven't booked a court.
            </div>
            <button
              className={styles["button"]}
              onClick={() => {
                setSelectedTab("Make Reservation");
              }}
            >
              Make a Reservation
            </button>
          </div>
        ) : (
          <>
            <div className={styles["text"]}>
              <div className={styles["title"]}>Your Bookings</div>
              <span className={styles["note"]}>
                You may have up to{" "}
                <span className={styles["highlight"]}>5 bookings</span> at a
                time
              </span>
              <span className={styles["direction"]}>
                Click the{" "}
                <FaRegTrashAlt size={15} className={styles["trash"]} /> icon to
                delete a booking
              </span>
              <span className={styles["bt-header"]}>Sort By</span>
              <BinaryToggle
                option1={filterValues[0]}
                option2={filterValues[1]}
                option={filter}
                setOption={setFilter}
                width={300}
              />
            </div>
            <div className={styles["bookings"]}>
              {bookings.map((booking) => (
                <div
                  className={styles["booking"]}
                  key={
                    booking.day +
                    booking.start.format("h:mm a") +
                    booking.end.format("h:mm p")
                  }
                >
                  <Reservation
                    courtType={booking.courtType}
                    courtNum={booking.courtNum}
                    day={booking.day}
                    start={booking.start}
                    end={booking.end}
                    enableDelete={true}
                    setLoading={setLoading}
                  />
                </div>
              ))}
            </div>
          </>
        )
      ) : null}
    </div>
  );
};

export default MyBookings;
