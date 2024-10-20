// src/features/profile/index.tsx
"use client";
import BasicInformation from './components/BasicInformation';
import ProjectInformation from './components/ProjectInformation';

export default function Profile() {
  return (
    <section className="bg-homeBg min-h-screen bg-no-repeat bg-center bg-cover bg-fixed md:pb-16 w-full">


      <div className="container grid grid-cols-12 md:gap-10 justify-between">
        <div className="col-span-12 lg:col-span-4  lg:h-screen lg:sticky top-44">
          <BasicInformation />
        </div>

        <div className="col-span-12 lg:col-span-8 mt-10">
          <ProjectInformation/>
        </div>
      </div>
      {/* End main continer */}
    </section>
  );
}

