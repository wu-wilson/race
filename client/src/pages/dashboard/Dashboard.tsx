import { ReactElement, useState } from "react";
import {
  FaBasketballBall,
  FaCalendarCheck,
  FaClock,
  FaUserFriends,
} from "react-icons/fa";
import { BsPersonPlusFill } from "react-icons/bs";
import Navbar from "../../components/navbar/Navbar";
import MyBookings from "./my-bookings/MyBookings";
import MakeReservation from "./make-reservation/MakeReservation";
import CourtStatus from "./court-status/CourtStatus";
import FriendActivity from "./friend-activity/FriendActivity";
import FriendRequest from "./friend-requests/FriendRequest";
import themes from "../../_themes.module.scss";
import styles from "./Dashboard.module.scss";

type tab = {
  name: string;
  icon: ReactElement;
  component: ReactElement;
};

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState<string>("My Bookings");

  // Tab name must be unique
  const tabs: tab[] = [
    {
      name: "My Bookings",
      icon: <FaClock className={styles["tab-icon"]} size={15} />,
      component: <MyBookings setSelectedTab={setSelectedTab} />,
    },
    {
      name: "Make Reservation",
      icon: <FaCalendarCheck className={styles["tab-icon"]} size={15} />,
      component: <MakeReservation setSelectedTab={setSelectedTab} />,
    },
    {
      name: "Court Status",
      icon: <FaBasketballBall className={styles["tab-icon"]} size={15} />,
      component: <CourtStatus />,
    },
    {
      name: "Friend Activity",
      icon: <FaUserFriends className={styles["tab-icon"]} size={15} />,
      component: <FriendActivity setSelectedTab={setSelectedTab} />,
    },
    {
      name: "Friend Requests",
      icon: <BsPersonPlusFill className={styles["tab-icon"]} size={15} />,
      component: <FriendRequest />,
    },
  ];

  return (
    <>
      <Navbar />
      <div className={styles["container"]}>
        <div className={styles["card"]}>
          <div className={styles["tabs"]}>
            {tabs.map((tab) => (
              <div
                className={`${styles["tab"]} ${
                  selectedTab === tab.name ? styles["selectedTab"] : ""
                }`}
                key={tab.name}
                onClick={() => setSelectedTab(tab.name)}
                style={{
                  color: tab.name === selectedTab ? themes.primary_color : "",
                  fontWeight: tab.name === selectedTab ? "bold" : "normal",
                }}
              >
                {tab.icon}
                {tab.name}
              </div>
            ))}
          </div>
          <div className={styles["screen"]}>
            {tabs.find((tab) => tab.name === selectedTab)
              ? tabs.find((tab) => tab.name === selectedTab)?.component
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
