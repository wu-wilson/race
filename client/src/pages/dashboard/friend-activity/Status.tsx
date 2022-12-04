import { VStack, Heading } from "@chakra-ui/layout";
import { TabPanel, TabPanels } from "@chakra-ui/tabs";
import { useContext, useState, useEffect } from "react";
import { FriendContext, UIDContext } from "./FriendActivity";
import axios from "axios";
import LoaderMessage from "../../../components/loader-message/LoaderMessage";
import Error from "../../../components/error/Error";
import moment, { Moment } from "moment";
import styles from "./Status.module.scss";
import { BsFillEmojiFrownFill } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import BinaryToggle from "../../../components/binary-toggle/BinaryToggle";
import Reservation from "../../../components/reservation/Reservation";

type booking = {
  courtType: string;
  courtNum: string;
  day: Moment;
  start: Moment;
  end: Moment;
};

const UserPanel = (uid: any) => {
  const [bookings, setBookings] = useState<booking[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const filterValues: string[] = ["Date & Time", "Court Type"];

  const [filter, setFilter] = useState<string>(filterValues[0]);

  const getBookings = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/bookings/${uid.uid}`)
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

        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
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

  return (
    <TabPanel>
      <div className={styles["container"]}>
        {loading ? (
          <LoaderMessage message="Fetching bookings..." />
        ) : error ? (
          <Error />
        ) : bookings ? (
          bookings.length === 0 ? (
            <div className={styles["no-reservations"]}>
              <div className={styles["title"]}>
                <BsFillEmojiFrownFill className={styles["icon"]} size={25} />
                No Reservations
              </div>
            </div>
          ) : (
            <>
              <div className={styles["bookings"]}>
                <Heading size="lg" className={styles["title"]}>Your Friend's Reservation</Heading>
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
    </TabPanel>
  )

};

const Status = () => {
  const [friendList, setFriendList] = useContext(FriendContext);
  const [uids, setUIDs] = useContext(UIDContext);

  return friendList.length > 0 ? (
    <VStack>
      <TabPanels>
        {uids.map((uid: any) => (
          <UserPanel uid={uid.uid}/>
          // <TabPanel>{ uid.uid }</TabPanel>
        ))}
      </TabPanels>
    </VStack>
  ) : (
    <VStack justify="center" pt="auto" textAlign="center" fontSize="lg">
      <TabPanels>
        <TabPanel>You do not have any friends added. Click add friend to search your friend up!</TabPanel>
      </TabPanels>
    </VStack>
  );
};

export default Status;
