//src/features/mock-interview/index.tsx
"use client";
import React from 'react';
import axios from "axios";
import { useAppSelector } from '@/lib/hooks'
import {
    LiveKitRoom,
    RoomAudioRenderer,
    StartAudio,
    useLocalParticipant,
  } from "@livekit/components-react";
import { useCallback } from "react";

import Playground from '../../components/Playground/Playground';
import { ConfigProvider } from "@/hooks/useConfig";
import { ConnectionMode, ConnectionProvider, useConnection } from "@/hooks/useConnection";
import { ToastProvider } from "@/components/toast/ToasterProvider";
import { TranscriptionProvider } from "@/hooks/useTranscription";
import { useTranscription } from '@/hooks/useTranscription';
import { formatTranscriptsForGPT } from '@/helper/formatTranscripts';
import { MockInterviewControlPanel } from '@/features/mock-interview/components/MockInterviewControlPanel';

  
  export default function MockInterview() {
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


    const { shouldConnect, wsUrl, token, roomName, mode, connect, disconnect } = useConnection();
    const user = useAppSelector((state) => state.user);
    const { transcripts } = useTranscription();
    const timestampRef = React.useRef<string | null>(null);
    const egressIdRef = React.useRef<string | null>(null);

    const handleConnect = useCallback(
      async (c: boolean, mode: ConnectionMode) => {
        c ? connect(mode) : disconnect();
      },
      [connect, disconnect]
    );

    const startEgress = useCallback(async () => {
      try {
        const userEmail = user.emailId
        const timestamp = new Date().toISOString();
        timestampRef.current = timestamp;
        const response = await axios.post("/api/start-recording", { roomName, userEmail, timestamp });
        egressIdRef.current = response.data.egressId || null;
        console.log(response.data.message);
      } catch (error) {
        console.error("Egress failed!:", error);
      }
    }, [roomName, user.emailId]);
  
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




    // happens when use connected
    const handleConnected = useCallback(async () => {  
      await startEgress();

  }, [startEgress]);



    // happens when disconnect
    const handleDisconnected = useCallback(async () => {
      await stopEgress();      
      const text = formatTranscriptsForGPT(transcripts);
      const timestamp = timestampRef.current;

      try {
        const response = await axios.post("/api/conversation-analyze", { text, timestamp, userEmail: user.emailId });
        console.log(response.data.message); 
        // upload user results to storage
      } catch (error) {
        console.error('Email sending failed:', error);
      }
    }, [stopEgress, transcripts, user.emailId]);



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
            scenarioContent={<MockInterviewControlPanel onConnect={(c: boolean) => {
              const m = process.env.NEXT_PUBLIC_LIVEKIT_URL ? "env" : mode;
              handleConnect(c, m);
            }}/>}
          />
          <RoomAudioRenderer />
          <StartAudio label="Click to enable audio playback" />
        </LiveKitRoom>
      </>
    );
  }