import { Modal, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/modal";
import { ModalOverlay, Button } from "@chakra-ui/react";
import TextField from "./TextField";
import {Formik, Form} from "formik";

const AddFriend = ({isOpen, onClose}: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a friend!</ModalHeader>
        <ModalCloseButton />
        <Formik initialValues={{ friendName: ""}}
          onSubmit={(values, actions) => {
            onClose();
            actions.resetForm();
        }}>
          <Form>
            <ModalBody>
              <TextField
                label="Friend's name"
                placeholder="Enter friend's username..."
                autoComplete="off"
                name="friendName"
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} type="submit">
                Submit
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  )
};

export default AddFriend;
