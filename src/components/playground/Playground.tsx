"use client";

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

const headerHeight = 56;

export default function Playground({
  onConnect,
}: PlaygroundProps) {
  const { config, setUserSettings } = useConfig();
  const { name } = useRoomInfo();
  const [transcripts, setTranscripts] = useState<ChatMessageType[]>([]);
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

  const agentVideoTrack = tracks.find(
    (trackRef) =>
      trackRef.publication.kind === Track.Kind.Video &&
      trackRef.participant.isAgent
  );

  const localTracks = tracks.filter(
    ({ participant }) => participant instanceof LocalParticipant
  );
  const localVideoTrack = localTracks.find(
    ({ source }) => source === Track.Source.Camera
  );
  const localMicTrack = localTracks.find(
    ({ source }) => source === Track.Source.Microphone
  );

  const onDataReceived = useCallback(
    (msg: any) => {
      if (msg.topic === "transcription") {
        const decoded = JSON.parse(
          new TextDecoder("utf-8").decode(msg.payload)
        );
        let timestamp = new Date().getTime();
        if ("timestamp" in decoded && decoded.timestamp > 0) {
          timestamp = decoded.timestamp;
        }
        setTranscripts([
          ...transcripts,
          {
            name: "You",
            message: decoded.text,
            timestamp: timestamp,
            isSelf: true,
          },
        ]);
      }
    },
    [transcripts]
  );

  useDataChannel(onDataReceived);











const audioTileContent = useMemo(() => {

  const disconnectedContent = (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-700 text-center w-full">
      No audio track. Connect to get started.
    </div>
  );

  const waitingContent = (
    <div className="flex flex-col items-center gap-2 text-gray-700 text-center w-full">
      <LoadingSVG />
      Waiting for audio track
    </div>
  );

  const visualizerContent = (
    <div
      className={`flex items-center justify-center w-full h-48 [--lk-va-bar-width:30px] [--lk-va-bar-gap:20px] [--lk-fg:var(--lk-theme-color)]`}
    >
      {localMicTrack && (
        <AudioInputTile trackRef={localMicTrack} />
      )}

      <BarVisualizer
        state={voiceAssistant.state}
        trackRef={voiceAssistant.audioTrack}
        barCount={5}
        options={{ minHeight: 20 }}
      />
    </div>
  );
  if (roomState === ConnectionState.Disconnected) {
    return disconnectedContent;
  }

  if (!voiceAssistant.audioTrack) {
    return waitingContent;
  }
  return visualizerContent;
}, [localMicTrack, voiceAssistant.state, voiceAssistant.audioTrack, roomState]);













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



        <div className="flex flex-col w-3/5 h-full space-y-9"> 
          <PlaygroundTile className="flex-1 border p-4 rounded-lg shadow-lg" backgroundColor = "#000000">
            {settingsTileContent}
          </PlaygroundTile>

          <PlaygroundTile className="flex-1 border p-4 rounded-lg shadow-lg">
            {config.settings.outputs.audio && audioTileContent}
          </PlaygroundTile>
        </div>




        <div className="flex flex-col w-2/5 h-full"> 
          <PlaygroundTile className="flex-1 border p-4 rounded-lg shadow-lg">
            {config.settings.chat && chatTileContent}
          </PlaygroundTile>
        </div>
        
      </div>

    </>
  );
}
