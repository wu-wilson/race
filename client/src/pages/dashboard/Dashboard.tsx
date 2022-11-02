import { ReactElement, useState } from "react";
import {
  FaBasketballBall,
  FaCalendarCheck,
  FaClock,
  FaUserFriends,
} from "react-icons/fa";
import Navbar from "../../components/navbar/Navbar";
import MyBookings from "./my-bookings/MyBookings";
import MakeReservation from "./make-reservation/MakeReservation";
import CourtStatus from "./court-status/CourtStatus";
import FriendActivity from "./friend-activity/FriendActivity";
import styles from "./Dashboard.module.scss";

type tab = {
  name: string;
  icon: ReactElement;
  component: ReactElement;
};

// Tab name must be unique
const tabs: tab[] = [
  {
    name: "My Bookings",
    icon: <FaClock className={styles["tab-icon"]} size={15} />,
    component: <MyBookings />,
  },
  {
    name: "Make Reservation",
    icon: <FaCalendarCheck className={styles["tab-icon"]} size={15} />,
    component: <MakeReservation />,
  },
  {
    name: "Court Status",
    icon: <FaBasketballBall className={styles["tab-icon"]} size={15} />,
    component: <CourtStatus />,
  },
  {
    name: "Friend Activity",
    icon: <FaUserFriends className={styles["tab-icon"]} size={15} />,
    component: <FriendActivity />,
  },
];

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].name);

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
