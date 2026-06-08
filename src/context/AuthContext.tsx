/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */

import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface User {
  _id: string;
  userName: string;
  email: string;
  role: string;
  country: string;
  phoneNumber?: string;
  profileImage?: string;
}

interface AuthContextInterface {
  userData: User | null;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  saveUserData: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export default function AuthContextProvider({children}: AuthContextProviderProps) {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const saveUserData = () => {
    const encodedToken = localStorage.getItem("token");

    if (encodedToken) {
      const decodedToken = jwtDecode<User>(encodedToken);
      setUserData(decodedToken);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{userData,setUserData,loading,saveUserData}}>{children}</AuthContext.Provider>
  );
}
