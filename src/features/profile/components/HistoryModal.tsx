// src/features/profile/components/HistoryModal.tsx
import { BsXCircle } from "react-icons/bs";
import Image from "next/image";
import Modal from "react-modal";
import { FiUser, FiCode, FiFilePlus, FiExternalLink } from "react-icons/fi";

interface HistoryModalProps {
  singleData: any;  // 根据你的类型定义调整
  isOpen: boolean;
  onRequestClose: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ singleData, isOpen, onRequestClose }) => {
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
          {singleData?.tag} Project
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 my-6 gap-4">
          <div className="space-y-2">
            <p className="dark:text-white flex items-center text-[15px] sm:text-lg">
              <FiFilePlus className="sm:text-lg hidden sm:block mr-2 md:text-xl" />
              Project :&nbsp; <span className="font-medium">Website</span>
            </p>
            <p className="dark:text-white flex items-center text-[15px] sm:text-lg">
              <FiCode className="text-lg mr-2 hidden sm:block" />
              Languages :&nbsp;
              <span className="font-medium">{singleData?.langages}</span>
            </p>
          </div>

          <div className="space-y-2">
            <p className="dark:text-white flex items-center text-[15px] sm:text-lg">
              <FiUser className="text-lg mr-2 hidden sm:block" />
              Client :&nbsp;
              <span className="font-medium">{singleData?.client}</span>
            </p>
            <p className="dark:text-white flex items-center text-[15px] sm:text-lg">
              <FiExternalLink className="text-lg mr-2 hidden sm:block" />
              Preview :&nbsp;
              <span className="font-medium transition-all duration-300 ease-in-out hover:text-[#ef4060]">
                <a
                  href={singleData?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {singleData?.linkText}
                </a>
              </span>
            </p>
          </div>
        </div>

        <p className="dark:text-white font-normal text-[15px] sm:text-sm">
          {singleData?.description}
        </p>

        <Image
          className="w-full md:h-[450px] h-auto object-cover rounded-xl mt-6"
          src={singleData?.img}
          alt="portfolio image"
          width={620}
          height={420}
          loading="lazy"
        />
      </div>
    </Modal>
  );
};

export default HistoryModal;
