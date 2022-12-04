import { MouseEvent } from "react";
import { MdComment } from "react-icons/md";
import { GiTreeBranch } from "react-icons/gi";
import Navbar from "../../components/navbar/Navbar";
import styles from "./Contact.module.scss";

const Contact = () => {
  const mailToFeedback = (e: MouseEvent<HTMLElement>) => {
    window.location.href = "mailto:emoryracefeedback@gmail.com";
    e.preventDefault();
  };

  const mailToSustainability = (e: MouseEvent<HTMLElement>) => {
    window.location.href = "mailto:emoryracesustainability@gmail.com";
    e.preventDefault();
  };

  return (
    <>
      <Navbar />
      <div className={styles["container"]}>
        <div className={styles["card"]}>
          <div className={styles["title"]}>
            <MdComment className={styles["icon"]} size={30} />
            Any Feedback?
          </div>
          <p className={styles["subtext"]}>
            Our team would love to hear your thoughts about our platform! If you
            have any questions, suggetions, or criticisms, please let us know by
            shooting us an email!
          </p>
          <button className={styles["button"]} onClick={mailToFeedback}>
            Email Us
          </button>
          <div className={styles["title"]}>
            <GiTreeBranch
              className={styles["icon"]}
              size={30}
              color={"lightgreen"}
            />
            Keeping It Green
          </div>
          <p className={styles["subtext"]}>
            Our team is committed to keeping our recreational centers green and
            sustainable. If you notice any non-eco friendly practices on our
            courts, please let us know.
          </p>
          <p className={styles["subtext"]}>
            You can visit{" "}
            <a
              className={styles["link"]}
              href="https://sustainability.emory.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Emory's Office of Sustainability website
            </a>{" "}
            to learn more about our mission and sustainability initiatives.
          </p>
          <button className={styles["button"]} onClick={mailToSustainability}>
            Sustainability Team
          </button>
        </div>
      </div>
    </>
  );
};

export default Contact;
