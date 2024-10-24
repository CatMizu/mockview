// src/features/mock-interview/components/InterviewInfoCollector.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { ConnectionState } from "livekit-client";
import { useConnectionState, useLocalParticipant } from "@livekit/components-react";
import { Button } from "@/components/button/Button";

interface MockInterviewControlPanelProps {
    onConnect: (connect: boolean, opts?: { token: string; url: string }) => void;
  }

export const MockInterviewControlPanel: React.FC<MockInterviewControlPanelProps> = ({ onConnect }) => {
  const { localParticipant } = useLocalParticipant();
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [position, setPosition] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [positionRequirement, setPositionRequirement] = useState(''); 
  const [interviewType, setInterviewType] = useState('Technical Interview');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [tier, setTier] = useState<'free' | 'subscribed'>('free');
  const roomState = useConnectionState();
  const [isFormComplete, setIsFormComplete] = useState(false);


  useEffect(() => {
    setIsFormComplete(
      position !== '' &&
      companyName !== '' &&
      companyLocation !== '' &&  
      positionRequirement !== '' && 
      interviewType !== '' &&
      additionalInfo !== ''
    );
  }, [position, companyName, companyLocation, positionRequirement, interviewType, additionalInfo]);

  useEffect(() => {
    if (roomState === ConnectionState.Connected && localParticipant && isFormComplete) {
      try {
        localParticipant.setAttributes({
          tier,
          scenario: "mock interview",
          position,
          companyLocation,
          positionRequirement,
          companyName,
          interviewType,
          additionalInfo,
        });
      } catch (error) {
        console.error('Failed to update participant attributes:', error);
      }
    }
  }, [roomState, localParticipant, position, companyName, interviewType, additionalInfo, isFormComplete, tier, companyLocation, positionRequirement]);


  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  const handleTierToggle = () => {
    setTier((prevTier) => (prevTier === 'free' ? 'subscribed' : 'free'));
  };

  return (
    <div className={`flex-none transition-all duration-300 ${isFormVisible ? 'h-auto' : 'h-12'}`}>
      <div className="border p-5 rounded-lg shadow-lg bg-gray-100 h-full relative">
        <button
          onClick={toggleFormVisibility}
          className="absolute right-4 top-4 text-sm text-gray-500 hover:text-gray-800"
        >
          {isFormVisible ? 'Hide' : 'Show'} Info
        </button>
        {isFormVisible && (
          <>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Interview Information</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700">Position</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Enter the position you're applying for"
                  disabled={roomState === ConnectionState.Connected}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Company Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter the company name"
                  disabled={roomState === ConnectionState.Connected}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Company Location</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={companyLocation}
                  onChange={(e) => setCompanyLocation(e.target.value)}
                  placeholder="Enter the company location"
                  disabled={roomState === ConnectionState.Connected}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Position Requirement</label>
                <textarea
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={positionRequirement}
                  onChange={(e) => setPositionRequirement(e.target.value)}
                  placeholder="Describe the position requirements"
                  disabled={roomState === ConnectionState.Connected}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Interview Type</label>
                <select
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={interviewType}
                  onChange={(e) => setInterviewType(e.target.value)}
                  disabled={roomState === ConnectionState.Connected}
                >
                  <option>Technical Interview</option>
                  <option>HR Interview</option>
                  <option>Behavioral Interview</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700">Additional Information</label>
                <textarea
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Any additional details..."
                  disabled={roomState === ConnectionState.Connected}
                />
              </div>
            </form>

            {/* Button and Tier Toggle aligned on the same row */}
            <div className="flex justify-between items-center mt-6">
              <Button
                disabled={roomState === ConnectionState.Connecting || !isFormComplete}
                onClick={() => {
                  onConnect(roomState === ConnectionState.Disconnected);
                }}
                className={`p-2 rounded-lg shadow-lg ${isFormComplete ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`} 
                connectionState={roomState}
              />
              
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

