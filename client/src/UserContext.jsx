import { useContext, createContext, useState } from "react";

const UserContext = createContext({});

export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
