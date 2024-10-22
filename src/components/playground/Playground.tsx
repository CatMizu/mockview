// src/components/playground/Playground.tsx
"use client";
import '@livekit/components-styles';

import { LoadingSVG } from "@/components/button/LoadingSVG";
import { ChatMessageType } from "@/components/chat/ChatTile";
import { AudioInputTile } from "@/components/config/AudioInputTile";
import { ConfigurationPanelItem } from "@/components/config/ConfigurationPanelItem";
import { PlaygroundTile} from "@/components/playground/PlaygroundTile";
import { useConfig } from "@/hooks/useConfig";
import { TranscriptionTile } from "@/transcriptions/TranscriptionTile";
import { Button } from "@/components/button/Button";
import {
  BarVisualizer,
  VideoTrack,
  useChatToggle,
  useConnectionState,
  useDataChannel,
  useLocalParticipant,
  useRoomInfo,
  useTracks,
  useVoiceAssistant,
} from "@livekit/components-react";
import { ConnectionState, LocalParticipant, Track } from "livekit-client";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";


export interface PlaygroundMeta {
  name: string;
  value: string;
}

export interface PlaygroundProps {
  onConnect: (connect: boolean, opts?: { token: string; url: string }) => void;
}


export default function Playground({
  onConnect,
}: PlaygroundProps) {
  const { config } = useConfig();
  const { localParticipant } = useLocalParticipant();


  const voiceAssistant = useVoiceAssistant();

  const roomState = useConnectionState();
  const tracks = useTracks();

  useEffect(() => {
    if (roomState === ConnectionState.Connected) {
      localParticipant.setCameraEnabled(config.settings.inputs.camera);
      localParticipant.setMicrophoneEnabled(config.settings.inputs.mic);
    }
  }, [config, localParticipant, roomState]);


  const localTracks = tracks.filter(
    ({ participant }) => participant instanceof LocalParticipant
  );
  const localVideoTrack = localTracks.find(
    ({ source }) => source === Track.Source.Camera
  );
  const localMicTrack = localTracks.find(
    ({ source }) => source === Track.Source.Microphone
  );




  const audioTileContent = useMemo(() => {
    const disconnectedContent = (
      <div className="flex flex-col items-center justify-center gap-2 text-gray-700 text-center w-full h-full">
        No audio track. Connect to get started.
      </div>
    );
  
    const waitingContent = (
      <div className="flex flex-col items-center justify-center gap-2 text-gray-700 text-center w-full h-full">
        <LoadingSVG />
        Waiting for audio track
      </div>
    );
  
    if (roomState === ConnectionState.Disconnected) {
      return disconnectedContent;
    }
  
    if (!voiceAssistant.audioTrack) {
      return waitingContent;
    }
  
    return (
      <div
      className="flex items-center justify-center w-full h-full"
      style={{ backgroundColor: "inherit" }}
    >
        <BarVisualizer
          state={voiceAssistant.state}
          trackRef={voiceAssistant.audioTrack}
          barCount={5}
          options={{ minHeight: 20 }}
          className="custom-bar-visualizer"
          style={{ backgroundColor: "transparent", margin: 0, padding: 0 }}
        />
      </div>
    );
  }, [roomState, voiceAssistant.audioTrack, voiceAssistant.state]);
  
  














  const chatTileContent = useMemo(() => {
    if (voiceAssistant.audioTrack) {
      return (
        <TranscriptionTile
          agentAudioTrack={voiceAssistant.audioTrack}
          accentColor={config.settings.theme_color}
        />
      );
    }
    return <></>;
  }, [config.settings.theme_color, voiceAssistant.audioTrack]);

  const settingsTileContent = useMemo(() => {
    return (
      <>
        {localVideoTrack && (
          <div className="absolute inset-0 w-full h-full">
            <VideoTrack trackRef={localVideoTrack} className="object-cover w-full h-full rounded-lg" />
          </div>
        )}
  
        <div className="absolute bottom-4 left-0 w-full h-auto z-10 flex justify-center items-center space-x-8 p-4">
          {localVideoTrack && (
            <ConfigurationPanelItem deviceSelectorKind="videoinput" />
          )}
  
          <Button
            disabled={roomState === ConnectionState.Connecting}
            onClick={() => {
              onConnect(roomState === ConnectionState.Disconnected);
            }}
            className="bg-white bg-opacity-75 p-2 rounded-lg shadow-lg"
            connectionState={roomState}
          >
          </Button>
  
          {localVideoTrack && (
            <ConfigurationPanelItem deviceSelectorKind="audioinput" />
          )}
        </div>
      </>
    );
  }, [roomState, localVideoTrack, onConnect]);
  

  return (
    <>
      <div className="flex h-full w-full space-x-9 p-4"> 



        <div className="flex flex-col w-3/5 h-full space-y-6"> 
          <PlaygroundTile className="flex-1 border p-4 rounded-lg shadow-lg" backgroundColor = "#343a40">
            {settingsTileContent}
          </PlaygroundTile>

          <PlaygroundTile className="flex-1 border p-4 rounded-lg shadow-lg">
            {config.settings.outputs.audio && audioTileContent}
          </PlaygroundTile>
        </div>




        <div className="flex flex-col w-2/5 h-full space-y-6">
          {/* Instruction Area - 调整背景色 */}
          <div className="flex-none" style={{ flexBasis: '33.33%' }}>
            <div className="border p-4 rounded-lg shadow-lg bg-gray-200 h-full">
              <p className="text-gray-800 text-center">This is the instruction area. Follow the instructions here.</p>
            </div>
          </div>

          {/* Chat Tile Area */}
          <PlaygroundTile className="flex-grow border p-4 rounded-lg shadow-lg lg:overflow-y-auto bg-gray-100">
            {config.settings.chat && chatTileContent}
          </PlaygroundTile>
        </div>

        
      </div>

    </>
  );
}