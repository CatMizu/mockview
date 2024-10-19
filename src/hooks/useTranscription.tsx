// hooks/useTranscription.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ChatMessageType } from '@/components/chat/ChatTile';

interface TranscriptionContextProps {
  transcripts: Map<string, ChatMessageType>;  
  addTranscript: (id: string, message: ChatMessageType) => void;
  clearTranscripts: () => void;
}

const TranscriptionContext = createContext<TranscriptionContextProps | undefined>(undefined);

export const TranscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [transcripts, setTranscripts] = useState<Map<string, ChatMessageType>>(new Map());

  const addTranscript = (id: string, message: ChatMessageType) => {
    setTranscripts((prev) => new Map(prev).set(id, message));  // 使用 set 方法更新 Map
  };

  const clearTranscripts = () => {
    setTranscripts(new Map());
  };

  return (
    <TranscriptionContext.Provider value={{ transcripts, addTranscript, clearTranscripts }}>
      {children}
    </TranscriptionContext.Provider>
  );
};

export const useTranscription = () => {
  const context = useContext(TranscriptionContext);
  if (!context) {
    throw new Error('useTranscription must be used within a TranscriptionProvider');
  }
  return context;
};
