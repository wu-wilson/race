import { useState, useEffect } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { booking } from "../my-bookings/MyBookings";
import { BsFillEmojiFrownFill } from "react-icons/bs";
import Reservation from "../../../components/reservation/Reservation";
import moment from "moment";
import axios from "axios";
import Error from "../../../components/error/Error";
import Dropdown from "../../../components/dropdown/Dropdown";
import LoaderMessage from "../../../components/loader-message/LoaderMessage";
import styles from "./FriendActivity.module.scss";

type Friend = {
  name: string;
  uid: string;
};

const FriendActivity = ({
  setSelectedTab,
}: {
  setSelectedTab: (tab: string) => void;
}) => {
  const auth = UserAuth();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [friends, setFriends] = useState<Friend[] | null>(null);
  const [noFriends, setNoFriends] = useState<boolean>(false);
  const [friend, setFriend] = useState<string | null>(null);

  const [reservations, setReservations] = useState<booking[] | null>(null);

  const fetchFriendData = async () => {
    if (auth) {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/friends/${auth.email}`)
        .then((res) => {
          setFriends(res.data);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          setLoading(false);
        });
    } else {
      setError(true);
      setLoading(false);
    }
  };

  const fetchReservations = async () => {
    setLoading(true);
    if (friends) {
      let fUID: string | null = null;
      for (let i = 0; i < friends.length; i++) {
        if (friends[i].name === friend) {
          fUID = friends[i].uid;
          break;
        }
      }
      if (fUID) {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/bookings/${fUID}`)
          .then((res) => {
            setError(false);
            let bookingList = [];
            for (let i = 0; i < res.data.length; i++) {
              const data = res.data[i];
              bookingList.push({
                courtType: data.courtType,
                courtNum: data.courtNum,
                day: moment(`${data.date}`, "DD MM YYYY"),
                start: moment(
                  `${data.date} ${data.start}`,
                  "DD MM YYYY h:mm a"
                ),
                end: moment(`${data.date} ${data.end}`, "DD MM YYYY h:mm a"),
              });
            }
            if (JSON.stringify(bookingList) === JSON.stringify(reservations)) {
              setLoading(false);
            } else {
              setReservations(bookingList);
            }
          })
          .catch((err) => {
            console.log(err);
            setError(true);
            setLoading(false);
          });
      } else {
        setError(true);
        setLoading(false);
      }
    } else {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reservations) {
      setLoading(false);
    }
  }, [JSON.stringify(reservations)]);

  useEffect(() => {
    if (friend) {
      fetchReservations();
    }
  }, [friend]);

  useEffect(() => {
    if (friends && friends.length > 0) {
      setFriend(friends[0].name);
    } else if (friends && friends.length === 0) {
      setNoFriends(true);
      setLoading(false);
    }
  }, [JSON.stringify(friends)]);

  useEffect(() => {
    if (loading && !friends) {
      fetchFriendData();
    }
  }, [loading]);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div className={styles["container"]}>
      {loading ? (
        <LoaderMessage message="Fetching your friend data..." />
      ) : error ? (
        <Error />
      ) : noFriends ? (
        <div className={styles["no-friends"]}>
          <div className={styles["title"]}>
            <BsFillEmojiFrownFill className={styles["icon"]} size={25} />
            No Friends Added
          </div>
          <span className={styles["subtext"]}>
            It seems like you haven't added a friend yet
          </span>
          <button
            className={styles["button"]}
            onClick={() => {
              setSelectedTab("Friend Requests");
            }}
          >
            Make a Friend Request
          </button>
        </div>
      ) : friends && friend ? (
        <>
          <div className={styles["text"]}>
            <span className={styles["title"]}>Friend Activity</span>
            <span className={styles["direction"]}>
              Choose a friend to see their bookings
            </span>
            <button
              className={styles["button"]}
              onClick={() => {
                setSelectedTab("Friend Requests");
              }}
            >
              Make Another Friend Request
            </button>
          </div>
          <div className={styles["content"]}>
            <Dropdown
              options={friends.map((friend) => {
                return friend.name;
              })}
              value={friend}
              setValue={setFriend}
              width={270}
              cutoff={19}
            />
            <div className={styles["reservation-container"]}>
              {reservations && reservations.length > 0 ? (
                reservations.map((reservation) => (
                  <div
                    key={JSON.stringify(reservation)}
                    className={styles["reservation"]}
                  >
                    <Reservation
                      courtType={reservation.courtType}
                      courtNum={reservation.courtNum}
                      day={reservation.day}
                      start={reservation.start}
                      end={reservation.end}
                      enableDelete={false}
                      setLoading={setLoading}
                    />
                  </div>
                ))
              ) : (
                <div className={styles["no-reservations"]}>
                  <div className={styles["title"]}>
                    <BsFillEmojiFrownFill
                      className={styles["icon"]}
                      size={25}
                    />
                    No Reservations
                  </div>
                  <span>It seems like this user hasn't booked a court.</span>
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default FriendActivity;
