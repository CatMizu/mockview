// src/features/profile/components/BasicInformation.tsx
import Image from 'next/image';
import { useAppSelector } from '@/lib/hooks';
import Social from './Social';
import Info from './Info';

interface BasicInformationProps {
  toggleView: () => void;
  isProjectView: boolean;
}

function BasicInformation({ toggleView, isProjectView }: BasicInformationProps) {
  const user = useAppSelector((state) => state.user);

  return (
    <div className="w-full mb-6 lg:mb-0 mx-auto relative bg-white text-center dark:bg-[#111111] px-6 rounded-[20px] mt-[180px] md:mt-[220px] lg:mt-0">
      <Image
        src={user.avatar}
        width={240}
        height={240}
        className="w-[240px] absolute left-[50%] transform -translate-x-[50%] h-[240px] drop-shadow-xl mx-auto rounded-[20px] -mt-[140px]"
        alt="avatar"
      />
      {/* Social card */}
      <div className="pt-[100px] pb-8">
        <h1 className="mt-6 mb-1 text-3xl font-semibold dark:text-white">
          {user.name}
        </h1>
        <h3 className="mb-4 text-[#7B7B7B] inline-block dark:bg-[#1D1D1D] px-5 py-1.5 rounded-lg dark:text-[#A6A6A6]">
          Good Person
        </h3>

        {/* Social Links */}
        <div className="flex justify-center space-x-3">
          <Social />
        </div>

        {/* personal information */}
        <div className="p-7 rounded-2xl mt-7 bg-[#F3F6F6] dark:bg-[#1D1D1D]">
          <Info />
        </div>

        {/* Toggle Button for Project/History */}
        <button
          onClick={toggleView}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-[#8752fa] to-[#DD2476] text-white rounded-[35px] hover:bg-gradient-to-l transition duration-300 ease-in-out"
        >
          {isProjectView ? 'Show Project History' : 'Show Project Information'}
        </button>
      </div>
    </div>
  );
}

export default BasicInformation;
