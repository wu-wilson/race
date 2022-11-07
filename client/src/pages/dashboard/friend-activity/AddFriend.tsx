import { Modal, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/modal";
import { ModalOverlay, Button } from "@chakra-ui/react";

const AddFriend = ({isOpen, onClose}: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a friend!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose} type="submit">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};

export default AddFriend;
