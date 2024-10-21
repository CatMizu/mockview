// src/features/profile/index.tsx
"use client";
import BasicInformation from './components/BasicInformation';
import ProjectInformation from './components/ProjectInformation';
import ProjectHistory from './components/ProjectHistory';
import { useState } from 'react';

export default function Profile() {
  const [isProjectView, setIsProjectView] = useState(true);


  const toggleView = () => {
    setIsProjectView(!isProjectView);
  };

  return (
    <section className="min-h-screen bg-no-repeat bg-center bg-cover bg-fixed md:pb-16 w-full pl-4">
      <div className="container grid grid-cols-12 md:gap-10 justify-between">
        <div className="col-span-12 lg:col-span-4 lg:h-screen lg:sticky top-44">
          <BasicInformation toggleView={toggleView} isProjectView={isProjectView} />
        </div>

        <div className="col-span-12 lg:col-span-8 mt-10">
          {isProjectView ? <ProjectInformation /> : <ProjectHistory />}
        </div>
      </div>
    </section>
  );
}
