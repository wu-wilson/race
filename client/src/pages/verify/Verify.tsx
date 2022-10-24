import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, sendEmailVerification } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import Particles from "../../components/particles/Particles";
import vars from "../../index.module.scss";
import styles from "./Verify.module.scss";

const Verify = () => {
  const navigate = useNavigate();
  const user = UserAuth();

  // If no user is logged in, redirect to login
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const [emailSent, setEmailSent] = useState<boolean>(false);

  const sendVerifyEmail = async (user: User) => {
    await sendEmailVerification(user)
      .then(() => {
        setEmailSent(true);
      })
      .catch((e: FirebaseError) => console.log(e));
  };

  // Check the verification status of the user in real time
  useEffect(() => {
    const checkVerification = async () => {
      await user?.reload().then(() => {
        if (user && !user.emailVerified) {
          checkVerification();
        } else {
          navigate("/dashboard");
        }
      });
    };
    if (emailSent) {
      checkVerification();
    }
  }, [emailSent]);

  const dashboardRedirect = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <Particles num={40} radius={6} color={vars["primary_color"]} />
      <div className={styles["container"]}>
        <div className={styles["card"]}>
          <div className={styles["titles"]}>
            <span className={styles["title"]}>Verify Email</span>
            <span className={styles["subtitle"]}>
              {user?.emailVerified
                ? `${user.email} has already been verified. Thank you for using RACE!`
                : emailSent
                ? `An account activation link was sent to ${user?.email}`
                : "Thank you for creating an account! Click the button below to verify your email and start using RACE!"}
            </span>
          </div>
          {user?.emailVerified ? (
            <button className={styles["button"]} onClick={dashboardRedirect}>
              Back to Home
            </button>
          ) : emailSent ? null : (
            <button
              className={styles["button"]}
              onClick={() => {
                if (user) sendVerifyEmail(user);
              }}
            >
              Verify
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Verify;
