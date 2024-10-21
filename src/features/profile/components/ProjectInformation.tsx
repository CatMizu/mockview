// src/features/profile/components/ProjectInformation.tsx
import React from 'react';
import Intro from './Intro';
import Highlights from './Highlights';
import Skills from './Skills';
import Performance from './Proformance';
import LeadFeedback from './LeadFeedback';

const ProjectInformation: React.FC = () => {
  return (
    <div className="lg:rounded-2xl bg-white dark:bg-[#111111] shadow-lg p-6 space-y-8">
      <div data-aos="fade">
        <Intro />
        <hr className="my-6 border-t-2 border-gray-200 dark:border-gray-700" />
        <Highlights />
        <hr className="my-6 border-t-2 border-gray-200 dark:border-gray-700" />
        <Skills />
        <hr className="my-6 border-t-2 border-gray-200 dark:border-gray-700" />
        <Performance />
        <hr className="my-6 border-t-2 border-gray-200 dark:border-gray-700" />
        <LeadFeedback />
        
        <div className="flex justify-center mt-32">
          <a
            download
            className="inline-flex items-center bg-gradient-to-r from-[#FA5252] to-[#DD2476] duration-200 transition ease-linear hover:bg-gradient-to-l px-8 py-3 text-lg text-white rounded-[35px]"
          >
            Download This Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectInformation;

