// src/features/profile/components/Highlights.tsx
import React from 'react';

const Highlights: React.FC = () => {
  return (
    <div className="pt-12 md:py-12 px-2 sm:px-5 md:px-10 lg:px-14">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Project Highlights
      </h2>

      <p className="text-gray-lite dark:text-color-910 leading-7 mb-6">
        Learn & work as a Machine Learning Engineer to develop an end-to-end solution to build a GenAI-powered recruiting system for a recruiting agency.
      </p>

      <h3 className="text-1xl font-semibold text-gray-900 dark:text-white mb-4">
        Key tasks:
      </h3>

      <ul className="list-disc list-inside text-gray-lite dark:text-color-910 leading-7 space-y-2">
        <li>Host a project intake meeting with the client</li>
        <li>Submit and discuss the solution proposal with the hiring manager</li>
        <li>Develop the end-to-end GenAI solution</li>
        <li>Present the solution to the client</li>
        <li>Host a project intake meeting with the client</li>
        <li>Submit and discuss the solution proposal with the hiring manager</li>
        <li>Develop the end-to-end GenAI solution</li>
        <li>Present the solution to the client</li>
      </ul>

      <p className="text-gray-lite dark:text-color-910 leading-7 mt-6">
        (Learn More)
      </p>
    </div>
  );
};

export default Highlights;
