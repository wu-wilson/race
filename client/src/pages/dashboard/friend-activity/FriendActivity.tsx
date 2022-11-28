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

export type Friend = {
  username: string;
  connected: boolean;
};

export const FriendContext = createContext<[Friend[], React.Dispatch<React.SetStateAction<Friend[]>>]>([[], () => null]);

const FriendActivity = () => {
  const user = UserAuth();
  const usersCollectionRef = collection(db, "users");

  const [uids, setUIDs] = useState<string[] | null>([]);

  const [friendList, setFriendList] = useState<Friend[]>([
    {username: "John Doe", connected: true },
    {username: "Jane Doe", connected: true },
  ]);

  const getUIDs = async (user : any) => {
    await axios.get(`${process.env.REACT_APP_API_URL}/getFriends/${user.uid}`).then((res) => {
      let userIDList = [];
      for (let i = 0; i < res.data.length; i++) {
        userIDList.push(res.data[i].fUID);
      };
      setUIDs(userIDList);
    });
  };
  useEffect(() => {
    getUIDs(user);
  });

  const getFriends = async (uids : any) => {
    let userFriendsList: Friend[] = [];
    for (let i = 0; i < uids.length; i++) {
      const snapshot = await getDocs(query(usersCollectionRef, where("uid", "==", uids[i])));
      const queryFriend = snapshot.docs.map((doc) => ({...doc.data()}))[0];
      userFriendsList.push({username: queryFriend.email, connected: true})
    }
    setFriendList(userFriendsList);
  };
  useEffect(() => {
    getFriends(uids);
  });

  return (
    <ChakraProvider theme={theme}>
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
    </ChakraProvider>
  );
};

export default FriendActivity;
