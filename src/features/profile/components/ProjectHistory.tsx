// src/features/profile/components/ProjectHistory.tsx
import HistoryItem from "./HistoryItem";
import HistoryModal from "./HistoryModal";
import Masonry from "react-masonry-css";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";

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
  const [data, setData] = useState<PortfolioData[]>([]); // 使用新的 data 结构

  // 获取 API 数据并生成新的 Data
  const fetchRecordingsAndAnalyses = async () => {
    try {
      const userEmail = "test@gmail.com"; // Replace with actual user email
  
      // Fetch video recordings
      const recordingsResponse = await axios.post("/api/get-recordings", { userEmail });
      const recordings: string[] = recordingsResponse.data.videoUrls || [];
  
      // Fetch conversation analyses
      const analysesResponse = await axios.post("/api/get-conversation-analyses", { userEmail });
      const analyses: AnalysisContent[] = analysesResponse.data.analysisContents || [];
  
      // 生成新的 PortfolioData 数据
      const newData: PortfolioData[] = analyses.map((analysis, index) => {
        // 从 fileName 中解析时间戳
        const fileName = analysis.fileName || "";
        const timestamp = fileName.split("_")[1]; // 假设文件名格式为 userEmail_timestamp_analysis.txt
        const formattedDate = timestamp ? format(new Date(timestamp), "yyyy-MM-dd HH:mm:ss") : "No Date";
  
        return {
          id: index, // 每个项目的 id
          title: formattedDate, // 使用解析后的时间作为标题
          img: "https://reqres.in/img/faces/7-image.jpg", // 默认图片路径
          videoLink: recordings[index] || "", // 从 recordings 中获取视频链接
          analyze: analysis.content || "No analysis available", // 获取分析内容
        };
      });
  
      setData(newData); // 更新 data 状态
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchRecordingsAndAnalyses();
  }, []);

  const handlePortfolioData = (id: number) => {
    const find = data.find((item) => item.id === id);
    setSingleData(find || null);
    setIsOpen(true);
  };

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
        {data.map((item) => (
          <HistoryItem
            key={item.id}
            item={item}
            onClick={() => handlePortfolioData(item.id)}
            theme={theme}
          />
        ))}
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
