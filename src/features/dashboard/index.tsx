"use client";
import React from 'react';
import { showNotification } from '../common/headerSlice';

import {
    LiveKitRoom,
    RoomAudioRenderer,
    StartAudio,
  } from "@livekit/components-react";
  import { useCallback } from "react";

  import Playground from "@/components/playground/Playground";
  import { ConfigProvider } from "@/hooks/useConfig";
  import { ConnectionMode, ConnectionProvider, useConnection } from "@/hooks/useConnection";
  import { ToastProvider } from "@/components/toast/ToasterProvider";
  
  export default function Dashboard() {
    return (
      <ToastProvider>
        <ConfigProvider>
          <ConnectionProvider>
            <HomeInner />
          </ConnectionProvider>
        </ConfigProvider>
      </ToastProvider>
    );
  }
  
  export function HomeInner() {
    const { shouldConnect, wsUrl, token, mode, connect, disconnect } =
      useConnection();
  
    const handleConnect = useCallback(
      async (c: boolean, mode: ConnectionMode) => {
        c ? connect(mode) : disconnect();
      },
      [connect, disconnect]
    );
  
    return (
      <>
        <LiveKitRoom
          serverUrl={wsUrl}
          token={token}
          connect={shouldConnect}
          className="flex flex-col h-full w-full"
        >
          
          <Playground
            onConnect={(c: boolean) => {
              const m = process.env.NEXT_PUBLIC_LIVEKIT_URL ? "env" : mode;
              handleConnect(c, m);
            }}
          />
          <RoomAudioRenderer />
          <StartAudio label="Click to enable audio playback" />
        </LiveKitRoom>
      </>
    );
  }