//src/features/profile/components/HistoryItem.tsx
import Image from "next/image";
import { format } from "date-fns";

interface PortfolioItemProps {
  item: any; 
  onClick: () => void;
  theme: string;
}

const HistoryItem: React.FC<PortfolioItemProps> = ({ item, onClick, theme }) => {

  return (
    <div
      className="rounded-lg p-8 dark:border-[2px] border-[#212425] shadow-lg transition-transform duration-200 hover:scale-105 mb-10 max-w-[400px] mx-4 my-5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 text-[#2E2E3A] dark:bg-gradient-to-r dark:from-[#1e1e2f] dark:via-[#2a2a3b] dark:to-[#343447] dark:text-white"
      onClick={onClick}
    >
      <div className="overflow-hidden rounded-lg">
        <Image
          className="w-full h-auto cursor-pointer transition duration-200 ease-in-out transform hover:scale-110 rounded-lg"
          src={item.img}  
          width={400}  
          height={400}
          priority
          alt="portfolio Image"
        />
      </div>
      <span className="pt-6 text-[16px] font-normal text-gray-lite block dark:text-[#A6A6A6]">
        {item.tag}
      </span>
      <h2 className="font-semibold text-2xl text-gray-700 dark:text-gray-300 tracking-wide mt-4 shadow-sm">
        <span className="text-xl ml-2">{item.title.split(" ")[0]}</span> {/* 显示年份 */}
        <span className="text-3xl">{item.title.replace(item.title.split(" ")[0], "")}</span> {/* 显示日期和时间 */}
      </h2>
    </div>
  );
};

export default HistoryItem;

