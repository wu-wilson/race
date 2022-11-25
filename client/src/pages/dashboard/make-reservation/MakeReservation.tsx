import { useState, useEffect } from "react";
import { courtTypes, getCourts } from "./step2/courts";
import { UserAuth } from "../../../context/AuthContext";
import { BsStackOverflow } from "react-icons/bs";
import moment, { Moment } from "moment";
import axios from "axios";
import StepProgressBar from "../../../components/step-progress-bar/StepProgressBar";
import LoaderMessage from "../../../components/loader-message/LoaderMessage";
import Step1 from "./step1/Step1";
import Step2 from "./step2/Step2";
import Step3 from "./step3/Step3";
import Submission from "./submission/Submission";
import styles from "./MakeReservation.module.scss";

const progressDescriptions = ["Date", "Time", "Review"];

const MakeReservation = ({
  setSelectedTab,
}: {
  setSelectedTab: (tab: string) => void;
}) => {
  // Selected Day
  const [day, setDay] = useState<Moment>(moment());

  // Selected Court
  const [courtType, setCourtType] = useState<string>(courtTypes[0]);
  const [courtNum, setCourtNum] = useState<string>(getCourts(courtType)[0]);

  // Selected Time
  const [start, setStart] = useState<Moment | null>(null);
  const [end, setEnd] = useState<Moment | null>(null);

  const [step, setStep] = useState<number>(1);

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const nextStep = () => {
    if (step < progressDescriptions.length) {
      setStep(step + 1);
    }
  };

  useEffect(() => {
    if (step < 3 && start && end) {
      setStart(null);
      setEnd(null);
    }
  }, [step]);

  const submit = () => {
    setStep(progressDescriptions.length + 1);
  };

  const reset = () => {
    setDay(moment());
    setCourtType(courtTypes[0]);
    setCourtNum(getCourts(courtType)[0]);
    setStart(null);
    setEnd(null);
    setStep(1);
  };

  const user = UserAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [maxReached, setMaxReached] = useState<boolean>(false);

  const checkNumReservations = async () => {
    if (user) {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/bookings/${user.uid}`)
        .then((res) => {
          if (res.data.length >= 5) {
            setMaxReached(true);
          } else {
            setMaxReached(false);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (loading) {
      checkNumReservations();
    }
  }, [loading]);

  useEffect(() => {
    if (step === 1) {
      setLoading(true);
    }
  }, [step]);

  return (
    <div className={styles["container"]}>
      {loading ? (
        <LoaderMessage message="Checking your reservation limit..." />
      ) : maxReached ? (
        <div className={styles["max"]}>
          <div className={styles["text"]}>
            <BsStackOverflow className={styles["icon"]} size={25} />
            Too many bookings
          </div>
          It seems like you have more than 5 many bookings.
          <button
            className={styles["button"]}
            onClick={() => setSelectedTab("My Bookings")}
          >
            Delete Bookings
          </button>
        </div>
      ) : (
        <>
          <div className={styles["progress"]}>
            <StepProgressBar
              numSteps={progressDescriptions.length}
              step={step}
              descriptions={progressDescriptions}
            />
          </div>
          {step === 1 ? <Step1 day={day} setDay={setDay} /> : null}
          {step === 2 ? (
            <Step2
              day={day}
              courtType={courtType}
              setCourtType={setCourtType}
              courtNum={courtNum}
              setCourtNum={setCourtNum}
              start={start}
              setStart={setStart}
              end={end}
              setEnd={setEnd}
            />
          ) : null}
          {step === 3 && start && end ? (
            <Step3
              courtType={courtType}
              courtNum={courtNum}
              day={day}
              start={start}
              end={end}
            />
          ) : null}
          {step === progressDescriptions.length + 1 && start && end ? (
            <Submission
              courtType={courtType}
              courtNum={courtNum}
              day={day}
              start={start}
              end={end}
              setSelectedTab={setSelectedTab}
              reset={reset}
            />
          ) : null}
          {step <= progressDescriptions.length ? (
            <div className={styles["buttons"]}>
              <button onClick={prevStep} disabled={step === 1}>
                Prev
              </button>
              {step === progressDescriptions.length ? (
                <button onClick={submit}>Submit</button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={step === 2 && !start && !end ? true : false}
                >
                  Next
                </button>
              )}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default MakeReservation;
