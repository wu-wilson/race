import { useState, useEffect } from "react";
import { UserAuth } from "../../../context/AuthContext";
import moment, { Moment } from "moment";
import axios from "axios";
import styles from "./MyBookings.module.scss";

type booking = {
  courtType: string;
  courtNum: string;
  day: string;
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
              day: data.date,
              start: moment(`${data.date} ${data.start}`, "DD MM YYYY h:mm a"),
              end: moment(`${data.date} ${data.end}`, "DD MM YYYY h:mm a"),
            });
            setBookings(bookingList);
          }
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
    if (bookings) {
      setLoading(false);
    }
  }, [bookings]);

  return (
    <div>
      {bookings?.map((booking) => (
        <div
          key={
            booking.day +
            booking.start.format("h:mm a") +
            booking.end.format("h:mm p")
          }
        >
          {booking.start.format("h:mm a")}
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
