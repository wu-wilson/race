import { MouseEvent } from "react";
import { BsGearWideConnected, BsGithub } from "react-icons/bs";
import { GiStairsGoal } from "react-icons/gi";
import Navbar from "../../components/navbar/Navbar";
import styles from "./About.module.scss";

const About = () => {
  const redirectCodebase = (e: MouseEvent<HTMLElement>) => {
    window.open(
      "https://github.com/wu-wilson/race",
      "_blank",
      "noopener,noreferrer"
    );
    e.preventDefault();
  };

  return (
    <>
      <Navbar />
      <div className={styles["container"]}>
        <div className={styles["card"]}>
          <div className={styles["title"]}>
            <BsGearWideConnected className={styles["icon"]} size={30} />
            Founders
          </div>
          <p className={styles["subtext"]}>
            Hey! We're Wilson Wu, Anay Roge, Nate Burbage, Susanna Spooner,
            Brett Anwar, Jonathan Kim, and Alec Chapman, the creators of RACE.
          </p>
          <p className={styles["subtext"]}>
            Our project is open source, so feel free to check us out on GitHub!
          </p>
          <button className={styles["button"]} onClick={redirectCodebase}>
            Visit Us <BsGithub className={styles["icon"]} size={18} />
          </button>
          <div className={styles["title"]}>
            <GiStairsGoal className={styles["icon"]} size={30} />
            Mission & Goals
          </div>
          <p className={styles["subtext"]}>
            Everyone's a lot busier these days. With so much going on, it's hard
            to find time to work out, especially with friends.
          </p>
          <p className={styles["subtext"]}>
            RACE lets you reserve recreational facilities so you can head to
            Woodpec without worrying about courts being full.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
