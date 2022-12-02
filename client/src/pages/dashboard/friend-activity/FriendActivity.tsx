import styles from "./FriendActivity.module.scss";
import React, { createContext, useState, useEffect } from "react";
import {ChakraProvider, Grid, GridItem, Tabs} from '@chakra-ui/react';
import Sidebar from './Sidebar';
import theme from "./theme";
import Status from "./Status";
import axios from "axios";
import { UserAuth } from "../../../context/AuthContext";
import { db } from "../../../context/firebase";
import { collection, getDocs, query, where } from 'firebase/firestore';
import LoaderMessage from "../../../components/loader-message/LoaderMessage";
import Error from "../../../components/error/Error";

export type Friend = {
  username: string;
  connected: boolean;
};

export const FriendContext = createContext<[Friend[], React.Dispatch<React.SetStateAction<Friend[]>>]>([[], () => null]);

const FriendActivity = () => {
  const user = UserAuth();

  const [uids, setUIDs] = useState<string[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const usersCollectionRef = collection(db, "users");

  const [friendList, setFriendList] = useState<Friend[]>([
    {username: "John Doe", connected: true },
    {username: "Jane Doe", connected: true },
  ]);

  const getUIDs = async (user : any) => {
    await axios.get(`${process.env.REACT_APP_API_URL}/getFriends/${user.uid}`).then((res) => {
      setError(false);
      let userIDList = [];
      for (let i = 0; i < res.data.length; i++) {
        userIDList.push(res.data[i].fUID);
      };
      setUIDs(userIDList);
    }).catch((err) => {
      console.log(err);
      setError(true);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (uids !== null) {
      setLoading(false);
    }
  }, [uids]);

  useEffect(() => {
    if (loading) {
      getUIDs(user);
    }
  }, [loading])

  const getFriends = async (uids : any) => {
    setError(false);

    let userFriendsList: Friend[] = [];
    for (let i = 0; i < uids.length; i++) {
      try {
        const snapshot = await getDocs(query(usersCollectionRef, where("uid", "==", uids[i])));
        const queryFriend = snapshot.docs.map((doc) => ({...doc.data()}))[0];
        userFriendsList.push({username: queryFriend.email, connected: true})
      } catch (err) {
        setError(true);
        setLoading(false);
        console.log(err);
      }
    }
    setFriendList(userFriendsList);
  };

  useEffect(() => {
    setLoading(friendList === null);
  }, [friendList])

  useEffect(() => {
    if (loading) {
      getFriends(uids);
    }
  }, [loading]);

  return (
    <ChakraProvider theme={theme}>
    {loading ? (
      <LoaderMessage message="Fetching court status..." />
    ) : error ? (
      <Error />
    ) : (
      <FriendContext.Provider value={ [friendList, setFriendList] }>
        <Grid templateColumns="repeat(10, 1fr)" h="100vh" as={Tabs}>
          <GridItem colSpan={3} borderRight="1px solid grey">
            <Sidebar/>
          </GridItem>
          <GridItem colSpan={7}>
            <Status />
          </GridItem>
        </Grid>
      </FriendContext.Provider>
    )}
    </ChakraProvider>
  );
};

export default FriendActivity;
