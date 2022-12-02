import { Modal, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/modal";
import { ModalOverlay, Button } from "@chakra-ui/react";
import TextField from "./TextField";
import {Formik, Form} from "formik";
import { UserAuth } from "../../../context/AuthContext";
import { db } from "../../../context/firebase";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from "react";
import axios from "axios";
import LoaderMessage from "../../../components/loader-message/LoaderMessage";
import Error from "../../../components/error/Error";


const AddFriend = ({isOpen, onClose}: any) => {
  const user = UserAuth();
  const usersCollectionRef = collection(db, "users");

  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<boolean>(false);
  //
  // const getUsers = async () => {
  //   const data = await getDocs(usersCollectionRef);
  // };
  //
  // useEffect(() => {
  //   getUsers();
  // }, []);



  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a friend!</ModalHeader>
        <ModalCloseButton />
        <Formik initialValues={{ friendEmail: ""}}
          onSubmit={(values, actions) => {
            // console.log(user);
            const getQuery = async(user : any) => {
              const q = query(usersCollectionRef, where("email", "==", values.friendEmail));
              const snapshot = await getDocs(q);
              const queryFriend = snapshot.docs.map((doc) => ({...doc.data()}))[0];
              await axios.post(`${process.env.REACT_APP_API_URL}/addFriend`, {
                uid: user.uid,
                fUID: queryFriend.uid
              }).catch((err) => {
                console.log(err);
              });
            }
            getQuery(user);
            onClose();
            actions.resetForm();
        }}>
          <Form>
            <ModalBody>
              <TextField
                label="Friend's email"
                placeholder="Enter friend's email..."
                autoComplete="off"
                name="friendEmail"
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
