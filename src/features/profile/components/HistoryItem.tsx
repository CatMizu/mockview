//src/features/profile/components/HistoryItem.tsx
import Image from "next/image";
import { format } from "date-fns";

interface PortfolioItemProps {
  item: any; 
  onClick: () => void;
  theme: string;
}

const HistoryItem: React.FC<PortfolioItemProps> = ({ item, onClick, theme }) => {
  const fileName = item.analysisFileName || "";
  const timestamp = fileName.split("_")[1]; // 从文件名中解析时间戳(hard coding)
  const formattedDate = timestamp ? format(new Date(timestamp), "yyyy-MM-dd HH:mm") : ""; // hard coding
  
  return (
    <div
      className="rounded-lg p-8 dark:border-[2px] border-[#212425] shadow-lg transition-transform duration-200 hover:scale-105 mb-10 max-w-[400px] mx-auto"
      style={{
        background: "#FFF0F0",
      }}
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
      <h2 className="font-medium cursor-pointer text-2xl duration-300 transition hover:text-[#FA5252] dark:hover:text-[#FA5252] dark:text-white mt-4">
        {item.title}
      </h2>
    </div>
  );
};

export default HistoryItem;

