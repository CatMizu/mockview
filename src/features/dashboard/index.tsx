//index.tsx
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
import { TranscriptionProvider } from "@/hooks/useTranscription";
import { useTranscription } from '@/hooks/useTranscription';
import { formatTranscriptsForGPT } from '@/helper/formatTranscripts';

  
  export default function Dashboard() {
    return (
      <ToastProvider>
        <ConfigProvider>
          <ConnectionProvider>
            <TranscriptionProvider>
              <HomeInner />
            </TranscriptionProvider>
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
        const response = await axios.post("/api/start-recording", { roomName });
        egressIdRef.current = response.data.egressId || null;
        console.log(response.data.message);
      } catch (error) {
        console.error("Egress failed!:", error);
      }
    }, [roomName]);
  
    const stopEgress = useCallback(async () => {
      if (!egressIdRef.current) {
        console.error("no Egress is running");
        return;
      }
      try {
        await axios.post("/api/stop-recording", { egressId: egressIdRef.current });
        egressIdRef.current = null;
      } catch (error) {
        console.error("Egress failed:", error);
      }
    }, []);


    const handleConnected = useCallback(async () => {
      await startEgress();
    }, [startEgress]);





    // happens when use disconnect
    const { transcripts } = useTranscription();

    const handleDisconnected = useCallback(async () => {
      await stopEgress();
      
      const text = formatTranscriptsForGPT(transcripts);
      
      try {
        const response = await axios.post("/api/analyze-text", { text });
        const result = await axios.post("/api/send-email", { response });
        console.log(result.data.message); 
      } catch (error) {
        console.error('Email sending failed:', error);
      }
    }, [stopEgress, transcripts]);















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