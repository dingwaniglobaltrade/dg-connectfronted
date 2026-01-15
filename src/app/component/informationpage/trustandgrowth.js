import React from "react";
import { RiDoubleQuotesL } from "react-icons/ri";

const TrustAndGrowth = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-10">
      <div className="relative border-2 border-[#D1C7BE] rounded-[10px] px-4 sm:px-8 lg:px-24 py-10">
        
        {/* Quote Icon */}
        <div className="absolute -top-6 left-6 sm:left-10">
          <RiDoubleQuotesL className="text-3xl sm:text-4xl text-[#FF6D2C] p-2 bg-[#FDF3EA] rounded-md" />
        </div>

        {/* Content */}
        <div className="italic text-[#58595D] text-sm sm:text-base lg:text-lg font-medium">
          <h3 className="mb-4 font-semibold">
            Powered by Trust. Built for Growth.
          </h3>

          <h4 className="mb-2">
            Dingwani Connects reflects Dingwani Foods’ commitment to:
          </h4>

          <ul className="list-disc pl-6 sm:pl-10 space-y-1">
            <li>Quality</li>
            <li>Transparency</li>
            <li>Long-term partnership</li>
            <li>Sustainable business growth</li>
          </ul>

          <h4 className="mt-4">
            It’s not just a platform—it’s a business community.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default TrustAndGrowth;
