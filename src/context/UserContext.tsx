import type { User, UserContextType } from "@/utils/types";
import { createContext, useContext, useState } from "react";



export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "Jane Doe",
    role: "branch-admin", 
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
