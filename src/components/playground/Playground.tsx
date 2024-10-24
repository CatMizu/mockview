// src/components/Playground/Playground.tsx
"use client";
import '@livekit/components-styles';
import { LoadingSVG } from "@/components/button/LoadingSVG";
import { ConfigurationPanelItem } from "@/components/config/ConfigurationPanelItem";
import { PlaygroundTile } from './PlaygroundTile';
import { useConfig } from "@/hooks/useConfig";
import { TranscriptionTile } from "@/transcriptions/TranscriptionTile";
import {
  BarVisualizer,
  VideoTrack,
  useConnectionState,
  useLocalParticipant,
  useTracks,
  useVoiceAssistant,
} from "@livekit/components-react";
import { ConnectionState, LocalParticipant, Track } from "livekit-client";
import { useEffect, useMemo } from "react";


export interface PlaygroundMeta {
  name: string;
  value: string;
}

export interface PlaygroundProps {
  onConnect: (connect: boolean, opts?: { token: string; url: string }) => void;
  scenarioContent: React.ReactNode;
}


export default function Playground({  onConnect, scenarioContent}: PlaygroundProps) {
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
          {localVideoTrack && <ConfigurationPanelItem deviceSelectorKind="videoinput" />}
          {localVideoTrack && <ConfigurationPanelItem deviceSelectorKind="audioinput" />}
        </div>
      </>
    );
  }, [localVideoTrack]);
  

  return (
    <div className="flex flex-col w-full space-y-6 lg:flex-row lg:space-y-0 lg:space-x-9 p-4">
      <div className="flex flex-col w-full min-h-0 space-y-6 lg:w-2/5 flex-shrink-0 overflow-hidden">
        {scenarioContent}
        <PlaygroundTile className="flex-grow border p-4 rounded-lg shadow-lg bg-gray-100 min-h-[200px] md:min-h-[350px] lg:min-h-[450px] max-h-[500px] overflow-y-auto">
          {config.settings.chat && chatTileContent}
        </PlaygroundTile>
      </div>

      <div className="flex flex-col w-full min-h-0 space-y-6 lg:w-3/5 flex-shrink-0 overflow-hidden">
      <PlaygroundTile className="flex-1 border p-4 rounded-lg shadow-lg min-h-[200px] md:min-h-[300px] lg:min-h-[400px] bg-gray-800" backgroundColor="#4a4e69">
        {settingsTileContent}
      </PlaygroundTile>
      <PlaygroundTile className="flex-1 border p-4 rounded-lg shadow-lg min-h-[200px] md:min-h-[300px] lg:min-h-[400px]">
        {config.settings.outputs.audio && audioTileContent}
      </PlaygroundTile>
    </div>

    </div>
  );
  
}