// hooks/useHeader.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface HeaderState {
  pageTitle: string;
  noOfNotifications: number;
  newNotificationMessage: string;
  newNotificationStatus: number;
}

interface HeaderContextType extends HeaderState {
  setPageTitle: (title: string) => void;
  showNotification: (message: string, status: number) => void;
  removeNotificationMessage: () => void;
}

const initialHeaderState: HeaderState = {
  pageTitle: "Home",
  noOfNotifications: 15,
  newNotificationMessage: "",
  newNotificationStatus: 1,
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [headerState, setHeaderState] = useState<HeaderState>(initialHeaderState);

  const setPageTitle = useCallback((title: string) => {
    setHeaderState((prevState) => ({
      ...prevState,
      pageTitle: title,
    }));
  }, []);

  const showNotification = useCallback((message: string, status: number) => {
    setHeaderState((prevState) => ({
      ...prevState,
      newNotificationMessage: message,
      newNotificationStatus: status,
    }));
  }, []);

  const removeNotificationMessage = useCallback(() => {
    setHeaderState((prevState) => ({
      ...prevState,
      newNotificationMessage: "",
    }));
  }, []);

  return (
    <HeaderContext.Provider
      value={{
        ...headerState,
        setPageTitle,
        showNotification,
        removeNotificationMessage,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
};
