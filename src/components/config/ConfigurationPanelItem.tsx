import { useMediaDeviceSelect } from "@livekit/components-react";
import { TrackToggle } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";

type ConfigurationPanelItemProps = {
  deviceSelectorKind?: MediaDeviceKind;
};

export const ConfigurationPanelItem: React.FC<ConfigurationPanelItemProps> = ({
  deviceSelectorKind = "audioinput",
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const deviceSelect = useMediaDeviceSelect({ kind: deviceSelectorKind });
  const [selectedDeviceName, setSelectedDeviceName] = useState("");

  useEffect(() => {
    deviceSelect.devices.forEach((device) => {
      if (device.deviceId === deviceSelect.activeDeviceId) {
        setSelectedDeviceName(device.label);
      }
    });
  }, [deviceSelect.activeDeviceId, deviceSelect.devices]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMenu) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="relative inline-block">
      <div className="flex items-center justify-center w-20 h-14 rounded-full bg-gray-300 hover:bg-gray-400 border border-gray-400 shadow-lg text-gray-800">
        <TrackToggle
          source={
            deviceSelectorKind === "audioinput"
              ? Track.Source.Microphone
              : Track.Source.Camera
          }
        />
      </div>


      <button
        className="absolute right-0 bottom-0 mt-1 mr-1 p-1 rounded-full bg-gray-100 hover:bg-gray-600 shadow-lg"
        onClick={(e) => {
          setShowMenu(!showMenu);
          e.stopPropagation();
        }}
      >
        <ChevronSVG />
      </button>


      <div
        className={`absolute right-0 top-full mt-2 bg-base-200 text-base-content border border-gray-800 rounded-lg shadow-lg z-10 w-auto min-w-[180px] ${
          showMenu ? "block" : "hidden"
        }`}
      >
        {deviceSelect.devices.map((device, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                deviceSelect.setActiveMediaDevice(device.deviceId);
                setShowMenu(false);
              }}
              className={`${
                device.deviceId === deviceSelect.activeDeviceId
                  ? "text-white bg-gray-600" 
                  : "text-gray-700"
              } bg-base-100 text-sm py-2 px-4 cursor-pointer hover:bg-gray-300 hover:text-gray-900 rounded-lg`} 
            >
              {device.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ChevronSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 5H5V7H3V5ZM7 9V7H5V9H7ZM9 9V11H7V9H9ZM11 7V9H9V7H11ZM11 7V5H13V7H11Z"
      fill="currentColor"
      fillOpacity="0.8"
    />
  </svg>
);
