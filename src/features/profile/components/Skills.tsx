//src/features/profile/components/Skills.tsx
import React from "react";

type TagListProps = {
  tagList: string[];
};

const Tag: React.FC<TagListProps> = ({ tagList }) => {
  return (
    <>
      {tagList.map((tag, i) => (
        <button
          className="bg-gray-200 dark:bg-[#222] text-gray-900 dark:text-white px-4 py-2 rounded-lg shadow-md text-[15px] hover:bg-gray-300 dark:hover:bg-[#333] transition-colors"
          key={i}
        >
          {tag}
        </button>
      ))}
    </>
  );
};

const Skills: React.FC = () => {
  const tagList = [
    "Python",
    "Chalice",
    "ElasticSearch",
    "AWS",
    "ETL Pipeline",
    "LLM",
    "Python",
    "Chalice",
    "ElasticSearch",
    "AWS",
    "ETL Pipeline",
    "LLM"
  ];

  return (
    <div className="pt-12 md:py-12 px-2 sm:px-5 md:px-10 lg:px-14">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Skills
      </h2>

      <div className="flex gap-x-3 gap-y-3 md:gap-y-3 md:gap-x-3 flex-wrap justify-start pr-80"> 
        <Tag tagList={tagList} />
      </div>
    </div>
  );
};

export default Skills;
