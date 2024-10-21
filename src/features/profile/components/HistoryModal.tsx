// src/features/profile/components/HistoryModal.tsx
import { BsXCircle } from "react-icons/bs";
import Modal from "react-modal";
import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface HistoryModalProps {
  singleData: {
    id: number;
    title: string;
    img: string;
    videoLink: string;
    analyze: string;
  } | null;  // 更新类型定义
  isOpen: boolean;
  onRequestClose: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ singleData, isOpen, onRequestClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    console.log("useEffect triggered");
    console.log("singleData:", singleData);
    console.log("singleData.videoLink:", singleData?.videoLink);

    if (singleData?.videoLink) {
      setTimeout(() => {
        if (videoRef.current) {
          console.log("videoRef.current:", videoRef.current);

          if (Hls.isSupported()) {
            const hls = new Hls();
            console.log("HLS.js is supported, loading source:", singleData.videoLink);

            hls.loadSource(singleData.videoLink);
            hls.attachMedia(videoRef.current);
            console.log("Video attached to HLS.js");

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              console.log("HLS.js manifest parsed, video should be ready to play.");
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
              if (data.fatal) {
                console.error("Fatal error during HLS playback:", data);
              } else {
                console.warn("Non-fatal HLS.js error:", data);
              }
            });
          } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            console.log("Native HLS support detected (Safari). Setting video source.");
            videoRef.current.src = singleData.videoLink;
          } else {
            console.error("This browser does not support HLS natively or via HLS.js.");
          }
        } else {
          console.warn("No valid videoRef.");
        }
      }, 100);  // 延迟100ms，确保 video 元素挂载完成
    } else {
      console.warn("No valid video link.");
    }
  }, [singleData]);

  if (!singleData) return null; // 如果 singleData 为空，则不渲染 Modal

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex justify-center items-center p-4 md:p-8 rounded-2xl my-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
    >
      <div className="relative w-full md:w-10/12 lg:w-[850px] bg-white dark:bg-[#323232] rounded-xl p-4 md:p-8 shadow-lg max-h-[90vh] overflow-y-auto">
        {/* 关闭按钮 */}
        <BsXCircle
          onClick={onRequestClose}
          className="text-4xl cursor-pointer absolute right-4 top-4 z-50 text-red-500 transition transform hover:rotate-45 duration-300 ease-in-out"
        />
        {/* Modal 内容 */}
        <h2 className="text-[#ef4060] dark:hover:text-[#FA5252] text-3xl text-center font-bold">
          {singleData?.title || "No title"}
        </h2>

        {/* 视频播放 */}
        {singleData?.videoLink ? (
          <video
            className="w-full md:h-[450px] h-auto object-cover rounded-xl mt-6"
            controls
            ref={videoRef}  // 引用 videoRef 以便使用 HLS.js
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <p className="dark:text-white font-normal text-[15px] sm:text-sm">
            No video available.
          </p>
        )}

        {/* 显示分析结果 */}
        <div className="space-y-2 mt-4">
          <p className="dark:text-white font-normal text-[15px] sm:text-sm">
            {singleData?.analyze || "No analysis available."}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default HistoryModal;
