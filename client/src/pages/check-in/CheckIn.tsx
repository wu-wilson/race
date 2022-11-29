import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getCourts } from "../dashboard/make-reservation/step2/courts";
import { AiFillCheckCircle } from "react-icons/ai";
import axios from "axios";
import LoaderMessage from "../../components/loader-message/LoaderMessage";
import Error from "../../components/error/Error";
import styles from "./CheckIn.module.scss";

const CheckIn = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const checkIn = async () => {
    const courtType = searchParams.get("courtType");
    const courtNum = searchParams.get("courtNum");
    if (
      courtType &&
      courtNum &&
      getCourts(courtType).includes(`Court ${courtNum}`)
    ) {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/check-in`, {
          courtType: courtType,
          courtNum: courtNum,
        })
        .then(() => {
          setError(false);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          setLoading(false);
        });
    } else {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      checkIn();
    }
  }, [loading]);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["card"]}>
        {loading ? (
          <LoaderMessage message={"Checking In..."} />
        ) : error ? (
          <Error />
        ) : (
          <>
            <div className={styles["text"]}>
              <AiFillCheckCircle className={styles["icon"]} size={25} />
              Success!
            </div>
            <div className={styles["subtext"]}>
              You have checked into {searchParams.get("courtType")} Court{" "}
              {searchParams.get("courtNum")}
            </div>
            <button
              className={styles["button"]}
              onClick={() => navigate("/dashboard")}
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckIn;
