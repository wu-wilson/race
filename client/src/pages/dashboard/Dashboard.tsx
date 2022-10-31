import { signOut } from "firebase/auth";
import { auth } from "../../context/firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth).then(() => {
      navigate("/login");
    });
  };

  return (
    <>
      <Navbar />
      <div className={styles["container"]}>
        dashboard<button onClick={logout}>Sign Out</button>
      </div>
    </>
  );
};

export default Dashboard;
