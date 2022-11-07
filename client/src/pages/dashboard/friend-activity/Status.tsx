import { VStack } from "@chakra-ui/layout";
import { TabPanel, TabPanels } from "@chakra-ui/tabs";
import { useContext } from "react";
import { FriendContext } from "./FriendActivity";

const Status = () => {
  const [friendList, setFriendList] = useContext(FriendContext);
  return friendList.length > 0 ? (
    <VStack>
      <TabPanels>
        <TabPanel>Status: Basketball Court 1</TabPanel>
      </TabPanels>
    </VStack>
  ) : (
    <VStack justify="center" pt="auto" textAlign="center" fontSize="lg">
      <TabPanels>
        <TabPanel>You do not have any friends added. Click add friend to search your friend up!</TabPanel>
      </TabPanels>
    </VStack>
  );
};

export default Status;
