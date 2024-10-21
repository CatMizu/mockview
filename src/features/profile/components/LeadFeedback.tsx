// src/features/profile/components/LeadFeedback.tsx
import React from "react";
import Image from "next/image";

const LeadFeedback: React.FC = () => {
  return (
    <div className="pt-12 md:py-12 px-2 sm:px-5 md:px-10 lg:px-14">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Project Lead Feedback
      </h2>

      {/* Feedback */}
      <h3 className="text-1xl font-semibold text-gray-900 dark:text-white mb-4">
        "It was a pleasure working with John, I would recommend ..."
      </h3>

      {/* Lead Info */}
      <div className="flex items-center">
        {/* Lead Avatar using next/image */}
        <Image
          className="rounded-full"
          src="https://media.licdn.com/dms/image/v2/C5603AQGFmu6gFFFITw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1583264055801?e=1735171200&v=beta&t=eJCYj0_GuXSDzPehIdh0eMLF5O93LLN0xBgkdsYjJFs" 
          alt="Lead Avatar"
          width={64} // Setting the width in pixels (16 * 4)
          height={64} // Setting the height in pixels (16 * 4)
          objectFit="cover" // Ensures image covers the container without stretching
        />
        <div className="ml-4">
          {/* Lead Name */}
          <h5 className="text-lg dark:text-white font-semibold">Leyuan</h5>
          {/* Position */}
          <p className="text-sm text-gray-600 dark:text-[#A6A6A6]">Senior Machine Learning Scientist</p>
          {/* Company */}
          <p className="text-sm text-gray-600 dark:text-[#A6A6A6]">Coursera</p>
        </div>
      </div>
    </div>
  );
};

export default LeadFeedback;
