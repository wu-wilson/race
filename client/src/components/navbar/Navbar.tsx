import { ReactElement, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiDashboardLine,
  RiInformationLine,
  RiAtLine,
  RiMenuFoldFill,
  RiMenuUnfoldFill,
} from "react-icons/ri";
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

  const [open, setOpen] = useState<boolean>(false);

  const logout = async () => {
    await signOut(auth).then(() => {
      navigate("/login");
    });
  };

  // Close hamburger menu when the user clicks outside.
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  // Close hamburger menu on resize event.
  useEffect(() => {
    window.addEventListener("resize", () => setOpen(false));
    return () => {
      window.removeEventListener("resize", () => setOpen(false));
    };
  }, []);

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
        <div className={styles["hamburger"]} onClick={() => setOpen(!open)}>
          {open ? (
            <RiMenuUnfoldFill size={23} className={styles["icon"]} />
          ) : (
            <RiMenuFoldFill size={23} className={styles["icon"]} />
          )}
          {open ? (
            <div className={styles["menu"]} ref={ref}>
              {links.map((link) => (
                <div
                  key={link.path}
                  className={styles["option"]}
                  onClick={() => navigate(link.path)}
                >
                  <span className={styles["label"]}>
                    <span className={styles["icon"]}>{link.icon}</span>
                    {link.name}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
