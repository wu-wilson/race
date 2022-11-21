import { useEffect } from "react";
import socket from "../../../socket";

const useSocketSetup = (user: any, email: any) => {
  useEffect(() => {
    socket.connect();
    socket.emit('custom', user, email);
    socket.on("connect_error", () => {
      console.log("Error in connecting to backend");
    });
    return () => {
      socket.off("connect_error");
    };
  }, []);
};

export default useSocketSetup;
