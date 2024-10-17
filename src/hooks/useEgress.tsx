// hooks/useEgress.ts

"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import { useConnection } from "./useConnection";

type EgressContextProps = {
  egressStarted: boolean;
  egressId: string | null;
  startEgress: () => Promise<void>;
  stopEgress: () => Promise<void>;
};

const EgressContext = createContext<EgressContextProps | undefined>(undefined);

export const EgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { roomName } = useConnection();
  const [egressStarted, setEgressStarted] = useState(false);
  const [egressId, setEgressId] = useState<string | null>(null);

  const startEgress = useCallback(async () => {
    if (egressStarted) return;
    try {
      const response = await axios.post("/api/start-egress", { roomName });
      console.log(response.data.message);
      setEgressId(response.data.egressId || null);
      setEgressStarted(true);
    } catch (error) {
      console.error("Failed to start egress:", error);
    }
  }, [roomName, egressStarted]);

  const stopEgress = useCallback(async () => {
    if (!egressId) {
      console.error("No egressId available to stop egress.");
      return;
    }
    try {
      const response = await axios.post("/api/stop-egress", { egressId });
      console.log(response.data.message);
      setEgressStarted(false);
      setEgressId(null);
    } catch (error) {
      console.error("Failed to stop egress:", error);
    }
  }, [egressId]);

  return (
    <EgressContext.Provider value={{ egressStarted, egressId, startEgress, stopEgress }}>
      {children}
    </EgressContext.Provider>
  );
};

export const useEgress = () => {
  const context = useContext(EgressContext);
  if (context === undefined) {
    throw new Error("useEgress must be used within an EgressProvider");
  }
  return context;
};
