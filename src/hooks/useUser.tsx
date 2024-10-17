// hooks/useUser.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import axios from "axios";

interface UserProfile {
  name: string;
  avatar: string;
  emailId: string;
}

interface UserContextType extends UserProfile {
  getUserInfo: (email: string) => void;
}

const initialUserState: UserProfile = {
  name: "",
  avatar: "",
  emailId: "",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>(initialUserState);

  const getUserInfo = useCallback(async (email: string) => {
    try {
      // 模拟 API 请求
      const response = { name: "Jianhao", avatar: "https://reqres.in/img/faces/7-image.jpg", emailId: email };

      setUser(response);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...user, getUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
