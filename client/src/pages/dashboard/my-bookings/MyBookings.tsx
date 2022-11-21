import { useState, useEffect } from "react";
import { UserAuth } from "../../../context/AuthContext";
import moment, { Moment } from "moment";
import axios from "axios";
import Reservation from "../../../components/reservation/Reservation";
import styles from "./MyBookings.module.scss";
import { start } from "repl";
import LoaderMessage from "../../../components/loader-message/LoaderMessage";

type booking = {
  courtType: string;
  courtNum: string;
  day: Moment;
  start: Moment;
  end: Moment;
};

const MyBookings = () => {
  const auth = UserAuth();

  const [bookings, setBookings] = useState<booking[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
          setBookings(bookingList);
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
    console.log(bookings);
  }, [bookings]);

  return (
    <div className={styles["container"]}>
      {loading ? (
        <LoaderMessage message="Fetching bookings..." />
      ) : (
        <>
          <div>Your Bookings</div>
          {bookings
            ? bookings.map((booking) => (
                <div
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
              ))
            : null}
        </>
      )}
    </div>
  );
};

export default MyBookings;
