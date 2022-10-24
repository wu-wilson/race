import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../context/firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  HiOutlineUser,
  HiOutlineLockClosed,
  HiOutlineLockOpen,
} from "react-icons/hi";
import {
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import Particles from "../../components/particles/Particles";
import vars from "../../index.module.scss";
import styles from "./Login.module.scss";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate(`/dashboard`);
      })
      .catch((e: FirebaseError) => {
        switch (e.code) {
          case "auth/invalid-email":
          case "auth/wrong-password":
          case "auth/user-not-found":
            setError("*Email or password is incorrect.");
            break;
          default:
            setError("*An error occurred. Please try again later.");
            break;
        }
        if (email === "" || password === "") {
          setError("*Enter your email and password.");
        }
      });
  };

  const registerRedirect = () => {
    navigate("/register");
  };

  const forgotPassword = () => {
    navigate("/resetpassword");
  };

  // Change login persistence for "remember me"
  useEffect(() => {
    setPersistence(
      auth,
      rememberMe ? browserLocalPersistence : browserSessionPersistence
    );
  }, [rememberMe]);

  return (
    <>
      <Particles num={40} radius={6} color={vars["primary_color"]} />
      <div className={styles["container"]}>
        <div className={styles["card"]}>
          <div className={styles["titles"]}>
            <span className={styles["title"]}>Sign In</span>
            <span className={styles["subtitle"]}>
              Welcome back! Enter your account details to sign in.
            </span>
          </div>
          <form className={styles["form"]} onSubmit={signIn}>
            <div className={styles["error"]}>{error ? error : null}</div>
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
            <div className={styles["remember-forgot-container"]}>
              <div className={styles["remember-me"]}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => {
                    setRememberMe(!rememberMe);
                  }}
                />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <div className={styles["forgot"]} onClick={forgotPassword}>
                Forgot password?
              </div>
            </div>
            <div className={styles["login-container"]}>
              <input type="submit" value="Login" className={styles["login"]} />
            </div>
          </form>
          <div className={styles["no-account"]} onClick={registerRedirect}>
            Don't have an account?{" "}
            <span className={styles["sign-up"]}>Create one!</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
