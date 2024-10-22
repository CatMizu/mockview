// src/features/profile/components/ProjectHistory.tsx
import HistoryItem from "./HistoryItem";
import HistoryModal from "./HistoryModal";
import Masonry from "react-masonry-css";
import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import axios from "axios";
import { useAppSelector } from '@/lib/hooks';

interface PortfolioData {
  id: number;
  title: string; 
  img: string; 
  videoLink: string; 
  analyze: string; 
}

interface AnalysisContent {
  fileName: string;
  content: string;
}

const ProjectHistory: React.FC = () => {
  const theme = "light";
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    500: 1,
  };

  const [singleData, setSingleData] = useState<PortfolioData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<PortfolioData[]>([]); 
  const user = useAppSelector((state) => state.user);

  const fetchRecordingsAndAnalyses = useCallback(async () => {
    try {
      const userEmail = user.emailId;
  
      // Fetch video recordings
      const recordingsResponse = await axios.post("/api/get-recordings", { userEmail });
      const recordings: string[] = recordingsResponse.data.videoUrls || [];
  
      // Fetch conversation analyses
      const analysesResponse = await axios.post("/api/get-conversation-analyses", { userEmail });
      const analyses: AnalysisContent[] = analysesResponse.data.analysisContents || [];

      const newData: PortfolioData[] = analyses.map((analysis, index) => {
        const fileName = analysis.fileName || "";
        const timestamp = fileName.split("_")[1]; // 假设文件名格式为 userEmail_timestamp_analysis.txt
        const formattedDate = timestamp ? format(new Date(timestamp), "yyyy MMM dd HH:mm") : "No Date";
      
        const randomImgUrl = `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`;
      
        return {
          id: index, 
          title: formattedDate, 
          img: randomImgUrl, // 使用带有随机参数的图片链接
          videoLink: recordings[index] || "",
          analyze: analysis.content || "No analysis available",
        };
      });
  
      setData(newData); // 更新 data 状态
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [user.emailId]); // 把 user.emailId 作为依赖

  useEffect(() => {
    fetchRecordingsAndAnalyses(); // useEffect 内调用这个 useCallback 包裹的函数
  }, [fetchRecordingsAndAnalyses]);

  const handlePortfolioData = (id: number) => {
    const find = data.find((item) => item.id === id);
    setSingleData(find || null);
    setIsOpen(true);
  };

  return (
    <div className="lg:rounded-2xl bg-white dark:bg-[#111111] shadow-lg p-6 space-y-8 min-h-[2000px]">

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
