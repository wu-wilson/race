import { signOut } from "firebase/auth";
import { auth } from "../../context/firebase";
import { useNavigate } from "react-router-dom";
import Particles from "../../components/particles/Particles";
import vars from "../../index.module.scss";
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
      <Particles num={40} radius={6} color={vars["primary_color"]} />
      <div className={styles["container"]}>
        dashboard<button onClick={logout}>Sign Out</button>
      </div>
    </>
  );
};

export default Dashboard;
