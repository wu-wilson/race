import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { checkEmail } from "../../register/helper-functions";
import { BsPatchPlus } from "react-icons/bs";
import { AiFillCheckCircle, AiFillMinusCircle } from "react-icons/ai";
import Error from "../../../components/error/Error";
import LoaderMessage from "../../../components/loader-message/LoaderMessage";
import axios from "axios";
import styles from "./FriendRequest.module.scss";

const FriendRequest = () => {
  const [sendingRequest, setSendingRequest] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");

  const auth = UserAuth();

  const [gettingRequests, setGettingRequests] = useState<boolean>(false);
  const [requests, setRequests] = useState<string[] | null>(null);

  const [error, setError] = useState<boolean>(false);

  const [deletingRequest, setDeletingRequest] = useState<boolean>(false);
  const [acceptingRequest, setAcceptingRequest] = useState<boolean>(false);

  const sendRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth) {
      if (checkEmail(email) === "valid") {
        if (email !== auth.email) {
          setSendingRequest(true);
          await axios
            .post(`${process.env.REACT_APP_API_URL}/send-request`, {
              person1: auth.email,
              person2: email,
              uid1: auth.uid,
            })
            .then((res) => {
              setError(false);
              if (res.data["errno"] && res.data["errno"] === 1062) {
                if (
                  message === "You've already sent a request to this person"
                ) {
                  setSendingRequest(false);
                } else {
                  setMessage("You've already sent a request to this person");
                }
              } else if (message === "Friend Request Sent") {
                setSendingRequest(false);
              } else {
                setMessage("Friend Request Sent");
              }
            })
            .catch((err) => {
              console.log(err);
              setError(true);
              setSendingRequest(false);
            });
        } else {
          if (message === "You cannot send a request to yourself") {
            setSendingRequest(false);
          } else {
            setMessage("You cannot send a request to yourself");
          }
        }
      } else {
        if (message === "Please enter a valid email address") {
          setSendingRequest(false);
        } else {
          setMessage("Please enter a valid email address");
        }
      }
    } else {
      setError(true);
      setSendingRequest(false);
    }
  };

  useEffect(() => {
    if (sendingRequest) {
      setSendingRequest(false);
    }
  }, [message]);

  const getPendingRequests = async () => {
    if (auth) {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/get-requests/${auth.email}`)
        .then((res) => {
          setError(false);
          let retrievedRequests = [];
          for (let i = 0; i < res.data.length; i++) {
            retrievedRequests.push(res.data[i]["person1"]);
          }
          if (
            retrievedRequests.length === requests?.length &&
            retrievedRequests.every((elem, index) => {
              return (elem = requests[index]);
            })
          ) {
            setGettingRequests(false);
          }
          setRequests(retrievedRequests);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          setGettingRequests(false);
        });
    } else {
      setError(true);
      setGettingRequests(false);
    }
  };

  useEffect(() => {
    if (requests !== null) {
      setGettingRequests(false);
    }
  }, [JSON.stringify(requests)]);

  useEffect(() => {
    getPendingRequests();
  }, [gettingRequests]);

  useEffect(() => {
    setGettingRequests(true);
  }, []);

  const deleteRequest = async (email: string) => {
    if (auth) {
      setDeletingRequest(true);
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/delete-request`, {
          data: { person1: email, person2: auth.email },
        })
        .then(() => {
          if (requests) {
            const updatedRequests = requests?.filter(
              (request) => request !== email
            );
            setRequests(updatedRequests);
          }
          setDeletingRequest(false);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          setDeletingRequest(false);
        });
    } else {
      setError(true);
      setDeletingRequest(false);
    }
  };

  const acceptRequest = async (email: string) => {
    if (auth) {
      setAcceptingRequest(true);
      await axios
        .put(`${process.env.REACT_APP_API_URL}/accept-request`, {
          uid2: auth.uid,
          person1: email,
          person2: auth.email,
        })
        .then(() => {
          if (requests) {
            const updatedRequests = requests?.filter(
              (request) => request !== email
            );
            setRequests(updatedRequests);
          }
          setAcceptingRequest(false);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          setAcceptingRequest(false);
        });
    }
  };

  return (
    <div className={styles["container"]}>
      {gettingRequests ? (
        <LoaderMessage message="Fetching pending requests..." />
      ) : sendingRequest ? (
        <LoaderMessage message="Sending friend request..." />
      ) : deletingRequest ? (
        <LoaderMessage message="Deleting friend request..." />
      ) : acceptingRequest ? (
        <LoaderMessage message="Accepting friend request..." />
      ) : error ? (
        <Error />
      ) : (
        <div className={styles["content"]}>
          <form className={styles["form"]} onSubmit={sendRequest}>
            <div className={styles["text"]}>
              <span className={styles["title"]}>Friend Requests</span>
              <span className={styles["direction"]}>
                Enter an email to send a friend request
              </span>
              <span className={styles["direction"]}>
                <AiFillCheckCircle
                  className={`${styles["request-button"]} ${styles["check"]}`}
                  size={20}
                />
                {"=    Accept a Pending Friend Request"}
              </span>
              <span className={styles["direction"]}>
                <AiFillMinusCircle
                  className={`${styles["request-button"]} ${styles["minus"]}`}
                  size={20}
                />
                {"=    Reject a Pending Friend Request"}
              </span>
            </div>
            <div className={styles["input-container"]}>
              <BsPatchPlus className={styles["icon"]} />
              <input
                type="text"
                className={styles["email"]}
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            {message ? (
              <span className={styles["message"]}>*{message}</span>
            ) : null}
            <input
              type="submit"
              value="Send Request"
              className={styles["send-button"]}
            />
          </form>
          <div className={styles["requests-container"]}>
            Pending Requests
            <div className={styles["requests"]}>
              {requests && requests.length > 0 ? (
                requests?.map((request) => (
                  <div key={request} className={styles["request"]}>
                    {request.length > 21
                      ? request.substring(0, 20) + "..."
                      : request}
                    <div className={styles["buttons"]}>
                      <AiFillCheckCircle
                        className={`${styles["request-button"]} ${styles["check"]}`}
                        size={20}
                        onClick={() => acceptRequest(request)}
                      />
                      <AiFillMinusCircle
                        className={`${styles["request-button"]} ${styles["minus"]}`}
                        size={20}
                        onClick={() => deleteRequest(request)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className={styles["request"]}
                  style={{ justifyContent: "center" }}
                >
                  No Requests Pending...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendRequest;
