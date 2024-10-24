// src/transcriptions/TranscriptionTile.tsx
import { ChatMessageType, ChatTile } from "@/components/chat/ChatTile";
import {
  TrackReferenceOrPlaceholder,
  useChat,
  useLocalParticipant,
  useTrackTranscription,
} from "@livekit/components-react";
import {
  LocalParticipant,
  Participant,
  Track,
  TranscriptionSegment,
} from "livekit-client";
import { useEffect, useState } from "react";
import { useTranscription } from "@/hooks/useTranscription";  // 引入 useTranscription

export function TranscriptionTile({
  agentAudioTrack,
  accentColor,
}: {
  agentAudioTrack: TrackReferenceOrPlaceholder;
  accentColor: string;
}) {
  const { addTranscript, transcripts } = useTranscription();  // 使用 useTranscription
  const agentMessages = useTrackTranscription(agentAudioTrack);
  const localParticipant = useLocalParticipant();
  const localMessages = useTrackTranscription({
    publication: localParticipant.microphoneTrack,
    source: Track.Source.Microphone,
    participant: localParticipant.localParticipant,
  });

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const { chatMessages, send: sendChat } = useChat();

  // store transcripts
  useEffect(() => {
    agentMessages.segments.forEach((s) => {
      const message = segmentToChatMessage(
        s,
        transcripts.get(s.id),  // 使用 get 从 Map 中获取
        agentAudioTrack.participant
      );
      addTranscript(s.id, message);  // 添加到 context 中
    });

    localMessages.segments.forEach((s) => {
      const message = segmentToChatMessage(
        s,
        transcripts.get(s.id),  // 使用 get 从 Map 中获取
        localParticipant.localParticipant
      );
      addTranscript(s.id, message);  // 添加到 context 中
    });

    const allMessages = Array.from(transcripts.values());  // 将 Map 转换为数组
    setMessages(allMessages);
  }, [
    agentMessages.segments,
    localMessages.segments,
    agentAudioTrack.participant,
    localParticipant.localParticipant,
    addTranscript,
    transcripts,
  ]);

  return (
    <div className="h-full max-h-[400px] overflow-y-auto">
      <ChatTile messages={messages} accentColor={accentColor} onSend={sendChat} />
    </div>
  );
}

function segmentToChatMessage(
  s: TranscriptionSegment,
  existingMessage: ChatMessageType | undefined,
  participant: Participant
): ChatMessageType {
  const msg: ChatMessageType = {
    message: s.final ? s.text : `${s.text} ...`,
    name: participant instanceof LocalParticipant ? "You" : "Agent",
    isSelf: participant instanceof LocalParticipant,
    timestamp: existingMessage?.timestamp ?? Date.now(),
  };
  return msg;
}
