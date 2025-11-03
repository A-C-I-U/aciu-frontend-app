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
    occupation: "Medical Doctor",
    phoneNumber: "234 903 828 3447",
    email: "janedoe@gmail.com",
    ageGrade: "Obiogu Age grade",
    branch: "Lagos Branch",
    verified: true,
    role: "branch-admin", 
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
