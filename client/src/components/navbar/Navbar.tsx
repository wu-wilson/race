import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { RiDashboardLine, RiInformationLine, RiAtLine } from "react-icons/ri";
import { UserAuth } from "../../context/AuthContext";
import { auth } from "../../context/firebase";
import { signOut } from "firebase/auth";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import styles from "./Navbar.module.scss";

type link = {
  name: string;
  path: string;
  icon: ReactElement;
};

const links: link[] = [
  {
    name: "dashboard",
    path: "/dashboard",
    icon: <RiDashboardLine size={20} />,
  },
  { name: "about", path: "/about", icon: <RiInformationLine size={20} /> },
  { name: "contact", path: "/contact", icon: <RiAtLine size={20} /> },
];

const Navbar = () => {
  const navigate = useNavigate();
  const user = UserAuth();

  const logout = async () => {
    await signOut(auth).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["links"]}>
        {links.map((link, index) => (
          <div
            key={link.path}
            className={styles["link"]}
            onClick={() => navigate(link.path)}
            style={{
              margin: index === 0 || index === links.length - 1 ? 0 : "0 4rem",
            }}
          >
            <span className={styles["icon"]}>{link.icon}</span>
            {link.name}
          </div>
        ))}
      </div>
      <div className={styles["right-items"]}>
        <ThemeToggle />
        {user ? (
          user.emailVerified ? (
            <button className={styles["button"]} onClick={logout}>
              Sign Out
            </button>
          ) : (
            <button
              className={styles["button"]}
              onClick={() => navigate("/verify")}
            >
              Verify Email
            </button>
          )
        ) : (
          <button
            className={styles["button"]}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
