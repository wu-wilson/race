import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Create user context
const UserContext = createContext<User | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authing, setAuthing] = useState<boolean>(true);

  // Update user/authing
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthing(false);
    });
    return () => unsubscribe();
  }, []);

  return authing ? (
    <div>Loading</div>
  ) : (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
