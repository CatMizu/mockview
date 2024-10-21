// src/features/profile/components/ProjectHistory.tsx
import HistoryItem from "./HistoryItem";
import HistoryModal from "./HistoryModal";
import portfolioData from "@/helper/portfolioData";
import Masonry from "react-masonry-css";
import { useState, useEffect } from "react";

const ProjectHistory: React.FC = () => {
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    500: 1,
  };

  const [singleData, setSingleData] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const theme = "light"; 

  const handlePortfolioData = (id: number) => {
    const find = portfolioData.find((item) => item.id === id);
    setSingleData(find || null);
    setIsOpen(true);
  };

  const [data, setData] = useState(portfolioData);


  return (
    <div className="lg:rounded-2xl bg-white dark:bg-[#111111] shadow-lg p-6 space-y-8">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-4"   
        columnClassName="pl-4"  
    >
        {data.map((item) => (
          <HistoryItem
            key={item.id}
            item={item}
            onClick={() => handlePortfolioData(item.id)}
            theme={theme}
          />
        ))}
      </Masonry>
      <HistoryModal
        singleData={singleData}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default ProjectHistory;
