// hooks/useRightDrawer.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface RightDrawerState {
  header: string;
  isOpen: boolean;
  bodyType: string;
  extraObject: Record<string, any>;
}

interface RightDrawerContextType extends RightDrawerState {
  openRightDrawer: (header: string, bodyType: string, extraObject: Record<string, any>) => void;
  closeRightDrawer: () => void;
}

const initialRightDrawerState: RightDrawerState = {
  header: "",
  isOpen: false,
  bodyType: "",
  extraObject: {},
};

const RightDrawerContext = createContext<RightDrawerContextType | undefined>(undefined);

export const RightDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [rightDrawerState, setRightDrawerState] = useState<RightDrawerState>(initialRightDrawerState);

  const openRightDrawer = useCallback((header: string, bodyType: string, extraObject: Record<string, any>) => {
    setRightDrawerState({
      isOpen: true,
      header,
      bodyType,
      extraObject,
    });
  }, []);

  const closeRightDrawer = useCallback(() => {
    setRightDrawerState(initialRightDrawerState);
  }, []);

  return (
    <RightDrawerContext.Provider value={{ ...rightDrawerState, openRightDrawer, closeRightDrawer }}>
      {children}
    </RightDrawerContext.Provider>
  );
};

export const useRightDrawer = () => {
  const context = useContext(RightDrawerContext);
  if (!context) {
    throw new Error("useRightDrawer must be used within a RightDrawerProvider");
  }
  return context;
};
