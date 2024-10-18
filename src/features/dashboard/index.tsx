"use client";
import React from 'react';
import axios from "axios";

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
    const { shouldConnect, wsUrl, token, roomName, mode, connect, disconnect } =
      useConnection();
  
    const handleConnect = useCallback(
      async (c: boolean, mode: ConnectionMode) => {
        c ? connect(mode) : disconnect();
      },
      [connect, disconnect]
    );


















    const egressIdRef = React.useRef<string | null>(null);

    const startEgress = useCallback(async () => {
      try {
        console.log("thisis -==--------------------------------------------the room name!:", roomName);
        const response = await axios.post("/api/start-recording", { roomName });
        egressIdRef.current = response.data.egressId || null;
        console.log(response.data.message);
      } catch (error) {
        console.error("启动 Egress 失败:", error);
      }
    }, [roomName]);
  
    const stopEgress = useCallback(async () => {
      if (!egressIdRef.current) {
        console.error("没有可用的 Egress ID 来停止录制。");
        return;
      }
      try {
        await axios.post("/api/stop-recording", { egressId: egressIdRef.current });
        console.log("Egress 已成功停止");
        egressIdRef.current = null;
      } catch (error) {
        console.error("停止 Egress 失败:", error);
      }
    }, []);

    // 连接成功时启动 Egress
    const handleConnected = useCallback(async () => {
      await startEgress();
    }, [startEgress]);

    const handleDisconnected = useCallback(async () => {
      await stopEgress();
    }, [stopEgress]);















    return (
      <>
        <LiveKitRoom
          serverUrl={wsUrl}
          token={token}
          connect={shouldConnect}
          onConnected={handleConnected}
          onDisconnected={handleDisconnected}
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