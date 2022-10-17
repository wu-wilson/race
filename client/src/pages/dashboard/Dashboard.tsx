import { useState } from "react";
import Dropdown from "../../components/dropdown/Dropdown";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const [val, setVal] = useState<string>("option 1");

  return (
    <div className={styles["container"]}>
      <Dropdown
        options={["option 1", "option 2", "option 3"]}
        value={val}
        setValue={setVal}
        width={200}
      />
    </div>
  );
};

export default Dashboard;
