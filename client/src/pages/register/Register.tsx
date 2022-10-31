import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { checkEmail, checkPassword } from "./helper-functions";
import { FirebaseError } from "firebase/app";
import { auth } from "../../context/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineLockOpen,
} from "react-icons/hi";
import Navbar from "../../components/navbar/Navbar";
import styles from "./Register.module.scss";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [showFirebaseError, setShowFirebaseError] = useState<boolean>(false);
  const [showInputErrors, setShowInputErrors] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const createAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkEmail(email) === "valid" && checkPassword(password) === "valid") {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/dashboard");
        })
        .catch((e: FirebaseError) => {
          switch (e.code) {
            case "auth/email-already-in-use":
              setFirebaseError(`*${email} is already in use.`);
              break;
            default:
              setFirebaseError("*An error occurred. Please try again later.");
              break;
          }
          setShowFirebaseError(true);
        });
    } else {
      setShowInputErrors(true);
    }
  };

  const loginRedirect = () => {
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className={styles["container"]}>
        <div className={styles["card"]}>
          <div className={styles["titles"]}>
            <span className={styles["title"]}>Join RACE</span>
            <span className={styles["subtitle"]}>
              Create an account and race to the courts!
            </span>
          </div>
          <form className={styles["form"]} onSubmit={createAccount}>
            <div className={styles["error-fb"]}>
              {showFirebaseError ? firebaseError : null}
            </div>
            <span>Email</span>
            <span className={styles["input-container"]}>
              <HiOutlineMail className={styles["icon"]} />
              <input
                type="text"
                className={styles["email"]}
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
              />
            </span>
            <span className={styles["error"]}>
              {!showInputErrors || checkEmail(email) === "valid"
                ? null
                : checkEmail(email)}
            </span>
            <span className={styles["input-title"]}>Password</span>
            <span className={styles["input-container"]}>
              {showPassword ? (
                <HiOutlineLockOpen
                  className={styles["icon"] + " " + styles["lock"]}
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <HiOutlineLockClosed
                  className={styles["icon"] + " " + styles["lock"]}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
              <input
                type={showPassword ? "text" : "password"}
                className={styles["password"]}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
              />
            </span>
            <span className={styles["error"]}>
              {!showInputErrors || checkPassword(password) === "valid"
                ? null
                : checkPassword(password)}
            </span>
            <div className={styles["button-container"]}>
              <input
                type="submit"
                value="Create Account"
                className={styles["create-account"]}
              />
            </div>
          </form>
          <div className={styles["has-account"]} onClick={loginRedirect}>
            Already have an account?{" "}
            <span className={styles["sign-in"]}>Sign in!</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
