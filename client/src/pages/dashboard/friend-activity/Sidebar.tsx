import { useContext, useState } from "react";
import { Button } from '@chakra-ui/button';
import { ChatIcon } from '@chakra-ui/icons';
import { Circle, Divider, Heading, HStack, Text, VStack } from '@chakra-ui/layout';
import { Tab, TabList, useDisclosure } from '@chakra-ui/react';
import styles from "./FriendActivity.module.scss";
import { FriendContext, Friend } from "./FriendActivity";
import AddFriend from "./AddFriend";

const Sidebar = () => {
  const circlePropsActive = {
    bg: "green",
    w: "20px",
    h: "20px"
  };
  const circlePropsInactive = {
    bg: "red",
    w: "20px",
    h: "20px"
  };

  const [friendList, setFriendList] = useContext(FriendContext);
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      <VStack py="1.4rem">
        <HStack justify="space-evenly" w="100%">
          <Heading size="md">Add Friend</Heading>
          <Button onClick={onOpen}>
            <ChatIcon/>
          </Button>
        </HStack>
        <Divider/>

        <VStack as={TabList}>
          {friendList.map((friend: any) => (
            <HStack as={Tab}>
              <Circle {...friend.connected ? circlePropsActive : circlePropsInactive}/>
              <Text>{friend.username}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>

      <AddFriend isOpen={isOpen} onClose={onClose} />
    </>
  )
};

export default Sidebar;
