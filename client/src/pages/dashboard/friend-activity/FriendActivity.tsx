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

export type Uid = {
  uid: string
}

export const FriendContext = createContext<[Friend[], React.Dispatch<React.SetStateAction<Friend[]>>]>([[], () => null]);
export const UIDContext = createContext<[Uid[], React.Dispatch<React.SetStateAction<Uid[]>>]>([[], () => null]);

const FriendActivity = () => {
  const user = UserAuth();

  const [uids, setUIDs] = useState<Uid[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const usersCollectionRef = collection(db, "users");
  const [friendList, setFriendList] = useState<Friend[]>([]);

  const getUIDs = async (user : any) => {
    await axios.get(`${process.env.REACT_APP_API_URL}/getFriends/${user.uid}`).then((res) => {
      setError(false);
      setLoading(true);
      let userIDList = [];
      for (let i = 0; i < res.data.length; i++) {
        userIDList.push({uid: res.data[i].fUID});
      };
      setUIDs(userIDList);
    }).catch((err) => {
      console.log(err);
      setError(true);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (loading) {
      getUIDs(user);
    }
  }, [loading]);

  const getFriends = async (uids : any) => {
    setError(false);

    let userFriendsList: Friend[] = [];
    for (let i = 0; i < uids.length; i++) {
      try {
        const snapshot = await getDocs(query(usersCollectionRef, where("uid", "==", uids[i].uid)));
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
        <UIDContext.Provider value={ [uids, setUIDs] }>
          <Grid templateColumns="repeat(10, 1fr)" h="100vh" as={Tabs}>
            <GridItem colSpan={3} borderRight="1px solid grey">
              <Sidebar/>
            </GridItem>
            <GridItem colSpan={7}>
              <Status />
            </GridItem>
          </Grid>
        </UIDContext.Provider>
      </FriendContext.Provider>
    )}
    </ChakraProvider>
  );
};

export default FriendActivity;
