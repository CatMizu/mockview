import React, { useEffect, useState } from 'react';
import { Button } from "@/components/button/Button"; // 确保 Button 组件的路径正确
import { ConnectionState } from "livekit-client"; // 从 livekit-client 导入 ConnectionState
import { useConnectionState, useLocalParticipant } from "@livekit/components-react";

interface InstructionProps {
  onConnect: (connect: boolean) => void; // 连接回调函数
}

export const Instruction: React.FC<InstructionProps> = ({ onConnect }) => {
  const [isInstructionVisible, setIsInstructionVisible] = useState(true);
  const roomState = useConnectionState(); 
  const { localParticipant } = useLocalParticipant();
  const [tier, setTier] = useState<'free' | 'subscribed'>('free');

  const toggleInstructionVisibility = () => {
    setIsInstructionVisible((prev) => !prev);
  };

  const handleTierToggle = () => {
    setTier((prevTier) => (prevTier === 'free' ? 'subscribed' : 'free'));
  };

  useEffect(() => {
    if (roomState === ConnectionState.Connected && localParticipant) {
      try {
        localParticipant.setAttributes({
          tier,
          scenario: "project intake",
        });
      } catch (error) {
        console.error('Failed to update participant attributes:', error);
      }
    }
  }, [roomState, localParticipant, tier]);

  return (
    <div className={`flex-none transition-all duration-300 ${isInstructionVisible ? 'h-auto' : 'h-12'}`}>
      <div className="border p-5 rounded-lg shadow-lg bg-gray-100 h-full relative">
        <button 
          onClick={toggleInstructionVisibility} 
          className="absolute right-4 top-4 text-sm text-gray-500 hover:text-gray-800"
        >
          {isInstructionVisible ? 'Hide' : 'Show'} Instructions
        </button>
        {isInstructionVisible && (
          <>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Project Intake Meeting</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              In this session, you will be leading a project intake meeting with an AI-simulated client from JRVS, a recruitment and consulting company. The goal of this meeting is to gather key details for building a GenAI-powered talent matching system.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              You&apos;ll need to ask strategic questions to understand the project timeline, data sources, current workflows, and business metrics such as matching accuracy and response rates. Identifying the specific challenges JRVS faces is crucial.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              This conversation will help you practice leading a consulting meeting aimed at defining project goals and finding tailored solutions.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-4 font-semibold">
              Press the Green Button to start. The practice history will be saved automatically once the conversation ends.
            </p>

            <div className="flex justify-between items-center mt-6">
              <Button
                disabled={roomState === ConnectionState.Connecting}
                onClick={() => {
                  onConnect(roomState === ConnectionState.Disconnected);
                }}
                className={`p-2 rounded-lg shadow-lg 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`} 
                connectionState={roomState}
              >

              </Button>
              
              <div className="flex items-center">
              <input 
                type="checkbox" 
                className={`toggle ${tier === 'subscribed' ? 'bg-[#4299E1] border-[#4299E1]' : 'bg-gray-300 border-gray-300'}`}  // Conditional toggle color
                checked={tier === 'subscribed'} 
                onChange={handleTierToggle}
                disabled={roomState === ConnectionState.Connected}
              />
                <span className="ml-3 text-sm w-24">{tier === 'subscribed' ? 'Subscribed' : 'Free'}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
