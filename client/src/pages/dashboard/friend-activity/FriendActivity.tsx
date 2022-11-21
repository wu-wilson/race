import styles from "./FriendActivity.module.scss";
import React, { createContext, useState, useEffect } from "react";
import {ChakraProvider, Grid, GridItem, Tabs} from '@chakra-ui/react';
import Sidebar from './Sidebar';
import theme from "./theme";
import Status from "./Status";
import socket from "../../../socket";

export type Friend = {
  username: string;
  connected: boolean;
};

export const FriendContext = createContext<[Friend[], React.Dispatch<React.SetStateAction<Friend[]>>]>([[], () => null]);
var users: string[] = [];
const FriendActivity = () => {
  // useEffect(() => {
    socket.connect();
    socket.on('userList', (email: any) => {
      users.push(email);
      console.log(email);
      console.log(users);
    });
  // }, []);
  const [friendList, setFriendList] = useState<Friend[]>([
    {username: "John Doe", connected: true },
    {username: "Jane Doe", connected: true },
  ]);

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
