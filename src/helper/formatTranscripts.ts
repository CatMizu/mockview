import { ChatMessageType } from "@/components/chat/ChatTile";

export function formatTranscriptsForGPT(transcripts: Map<string, ChatMessageType>): string {
    const formattedText = Array.from(transcripts.values())
      .sort((a, b) => a.timestamp - b.timestamp)  // 按时间戳排序
      .map(({ name, message }) => `${name}: ${message.trim()}`)  // 格式化为 'name: message'
      .join("\n");  // 使用换行符连接所有对话
  
    return formattedText;
  }
  