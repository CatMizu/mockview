import { useMediaDeviceSelect } from "@livekit/components-react";
import { useEffect, useState } from "react";

type PlaygroundDeviceSelectorProps = {
  kind: MediaDeviceKind;
};

export const PlaygroundDeviceSelector = ({
  kind,
}: PlaygroundDeviceSelectorProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const deviceSelect = useMediaDeviceSelect({ kind: kind });
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
      {/* 主按钮，音视频开关按钮 */}
      <button
        className="btn btn-ghost flex gap-2 items-center px-2 py-1 border rounded-lg shadow hover:bg-gray-700 text-gray-200" 
        onClick={() => {
          // 主按钮的操作：例如开启/关闭视频或音频
          console.log("Toggle video/audio");
        }}
      >
        {/* 按钮文本或图标 */}
        <span className="max-w-[80px] overflow-ellipsis overflow-hidden whitespace-nowrap">
          {selectedDeviceName || "Toggle Media"} {/* 显示设备名称或默认文本 */}
        </span>
      </button>

      {/* 右上角小箭头 */}
      <button
        className="absolute right-0 top-0 mt-1 mr-1 p-1 rounded-full bg-gray-700 hover:bg-gray-600"
        onClick={(e) => {
          setShowMenu(!showMenu);
          e.stopPropagation(); // 阻止事件冒泡，防止触发主按钮
        }}
      >
        <ChevronSVG />
      </button>

      {/* 下拉菜单，设备选择器 */}
      <div
        className={`absolute right-0 top-full mt-2 bg-base-100 text-base-content border border-gray-800 rounded-lg shadow-lg z-10 w-auto min-w-[150px] ${
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
                  ? "text-white bg-primary"
                  : "text-gray-500"
              } bg-base-200 text-xs py-2 px-2 cursor-pointer hover:bg-primary hover:text-white rounded-lg`}
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
