import { ReactElement, useState } from "react";
import {
  FaBasketballBall,
  FaCalendarCheck,
  FaClock,
  FaUserFriends,
} from "react-icons/fa";
import Navbar from "../../components/navbar/Navbar";
import styles from "./Dashboard.module.scss";

type tab = {
  name: string;
  icon: ReactElement;
};

const tabs: tab[] = [
  {
    name: "My Bookings",
    icon: <FaClock className={styles["tab-icon"]} size={15} />,
  },
  {
    name: "Make Reservation",
    icon: <FaCalendarCheck className={styles["tab-icon"]} size={15} />,
  },
  {
    name: "Court Status",
    icon: <FaBasketballBall className={styles["tab-icon"]} size={15} />,
  },
  {
    name: "Friend Activity",
    icon: <FaUserFriends className={styles["tab-icon"]} size={15} />,
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
          <div className={styles["screen"]}></div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
