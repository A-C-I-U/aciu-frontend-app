import type { User, UserContextType } from "@/utils/types";
import { createContext, useContext, useEffect, useState } from "react";



export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
