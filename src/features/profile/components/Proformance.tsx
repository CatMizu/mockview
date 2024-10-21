// src/features/profile/components/Proformance.tsx
import { Line } from "rc-progress";
import React from "react";

// 定义 lineArray 中每个 item 的类型
type LineItemProps = {
  id: number;
  color: string;
  name: string;
  number: string;
};

// Performance 组件
const Performance: React.FC = () => {
  const lineArray: LineItemProps[] = [
    {
      id: 1,
      color: "#FF6464",
      name: "Technical",
      number: "80",
    },
    {
      id: 2,
      color: "#9272D4",
      name: "Coachability",
      number: "95",
    },
    {
      id: 3,
      color: "#5185D4",
      name: "Communication",
      number: "65",
    },
    {
      id: 4,
      color: "#CA56F2",
      name: "Execution",
      number: "75",
    },
  ];

  return (
    <div className="pt-12 md:py-12 px-2 sm:px-5 md:px-10 lg:px-14">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Performance Summary (AI)
      </h2>

      <p>John is very easy to work with and highly coachable. Based on his performance, 
        he is qualified for positions like Data Scientist or Machine Learning Engineer in banks, consulting, etc.
      </p>
      <br /> 
      <p>
        {/* 在这里添加换行 */}
        To further improve, John should gain more experience on ..
      </p>
      <br /> 
      <p>John is very easy to work with and highly coachable. Based on his performance, 
        he is qualified for positions like Data Scientist or Machine Learning Engineer in banks, consulting, etc.
      </p>
      <br />
      <br />
      <br />
      {lineArray.map((item) => (
        <div className="mb-7" key={item.id}>
          <div className="flex justify-between py-1">
            <span className="text-base text-gray-lite font-semibold dark:text-[#A6A6A6]">
              {item.name}
            </span>
            <span className="pr-80 text-base font-semibold text-gray-lite pr-5 dark:text-[#A6A6A6]">
              TOP {item.number}% {/* 显示 "TOP x%" */}
            </span>
          </div>

          <div className="pr-80"> {/* 添加 padding-right 确保进度条右边距较大 */}
            <Line
              percent={parseInt(item.number)}
              strokeWidth={1}
              trailWidth={1}
              strokeColor={item.color}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Performance;
