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

  const videoTileContent = useMemo(() => {
    const videoFitClassName = `object-${config.video_fit || "cover"}`;

    const disconnectedContent = (
      <div>
        No video track. Connect to get started.
      </div>
    );

    const loadingContent = (
      <div>
        <LoadingSVG />
        Waiting for video track
      </div>
    );

    const videoContent = (
      <VideoTrack
        trackRef={agentVideoTrack}
      />
    );

    let content = null;
    if (roomState === ConnectionState.Disconnected) {
      content = disconnectedContent;
    } else if (agentVideoTrack) {
      content = videoContent;
    } else {
      content = loadingContent;
    }

    return (
      <div>
        {content}
      </div>
    );
  }, [agentVideoTrack, config, roomState]);

  const audioTileContent = useMemo(() => {
    const disconnectedContent = (
      <div>
        No audio track. Connect to get started.
      </div>
    );

    const waitingContent = (
      <div>
        <LoadingSVG />
        Waiting for audio track
      </div>
    );

    const visualizerContent = (
      <div>
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
  }, [voiceAssistant.audioTrack, roomState, voiceAssistant.state]);

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
      <div>




        <ConfigurationPanelItem
          title="Camera"
          deviceSelectorKind="videoinput"
        >
          {localVideoTrack && (
            <div>
              <VideoTrack
                trackRef={localVideoTrack}
              />
            </div>
          
          )}
        </ConfigurationPanelItem>






        <ConfigurationPanelItem
          title="Microphone"
          deviceSelectorKind="audioinput"
        >
          {localMicTrack && (
            <AudioInputTile trackRef={localMicTrack} />
          )}
        </ConfigurationPanelItem>




      </div>
    );
  }, [localVideoTrack, localMicTrack]);


  return (
    <>
      <Button
        disabled={roomState === ConnectionState.Connecting}
        onClick={() => {
          onConnect(roomState === ConnectionState.Disconnected);
        }}
      >
        {roomState === ConnectionState.Connecting ? (
          <LoadingSVG />
        ) : roomState === ConnectionState.Connected ? (
          "Disconnect"
        ) : (
          "Connect"
        )}
      </Button>




      <div className="flex flex-col w-3/5">    
        <PlaygroundTile
            title="Video"
        >
          {settingsTileContent}
        </PlaygroundTile>     




        <PlaygroundTile
          title="Audio"
        >
          {config.settings.outputs.audio && audioTileContent}
        </PlaygroundTile>

      </div>


      <div className="flex flex-col w-2/5">
        <PlaygroundTile
          title="Chat"
        >
          {config.settings.chat && chatTileContent}
        </PlaygroundTile>
      </div>



    </>
  );
}
