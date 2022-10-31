import { HiOutlineUser } from "react-icons/hi";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../context/firebase";
import Navbar from "../../components/navbar/Navbar";
import styles from "./ResetPassword.module.scss";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);

  const reset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        navigate("/login");
      })
      .catch((e: FirebaseError) => {
        switch (e.code) {
          case "auth/invalid-email":
            setError("*The entered email is not associated with an account.");
            break;
          case "auth/missing-email":
            setError("*Please enter a valid email address.");
            break;
          default:
            setError("*An unknown error occurred. Please try again later.");
        }
        setShowError(true);
      });
  };

  return (
    <>
      <Navbar />
      <div className={styles["container"]}>
        <div className={styles["card"]}>
          <div className={styles["titles"]}>
            <span className={styles["title"]}>Reset Password</span>
            <span className={styles["subtitle"]}>
              Enter the email associated with your account to receive a link to
              reset your password.
            </span>
          </div>
          {showError ? <div className={styles["error"]}>{error}</div> : null}
          <form className={styles["form"]} onSubmit={reset}>
            <span>Email</span>
            <span className={styles["input-container"]}>
              <HiOutlineUser className={styles["icon"]} />
              <input
                type="text"
                className={styles["email"]}
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
              />
            </span>
            <div className={styles["reset-container"]}>
              <input
                type="submit"
                value="Send Email"
                className={styles["reset"]}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
