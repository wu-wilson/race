import styles from "./FriendActivity.module.scss";
import React, { createContext, useState } from "react";
import {ChakraProvider, Grid, GridItem, Tabs} from '@chakra-ui/react';
import Sidebar from './Sidebar';
import theme from "./theme";
import Status from "./Status";

export type Friend = {
  username: string;
  connected: boolean;
};
//
// type FriendContext = [Friend[], React.Dispatch<React.SetStateAction<Friend[]>>];

export const FriendContext = createContext<[Friend[], React.Dispatch<React.SetStateAction<Friend[]>>]>([[], () => null]);

const FriendActivity = () => {
  const [friendList, setFriendList] = useState<Friend[]>([
    {username: "John Doe", connected: false },
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
