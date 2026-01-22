import React from "react";
import Image from "next/image";

import Operations from "@/icons/informationpage/operations.png";

const operationsData = [
  {
    id: 1,
    number: "01",
    text: "Dingwani Foods powers the platform",
  },
  {
    id: 2,
    number: "02",
    text: "Distributors connect directly with the brand",
  },
  {
    id: 3,
    number: "03",
    text: "Retailers align with verified distributors",
  },
  {
    id: 4,
    number: "04",
    text: "Orders, offers, communication, and growth flow seamlessly",
  },
];

const OperationsSection = () => {
  return (
    <div className="w-full bg-white min-h-[60vh] flex flex-col lg:flex-row justify-between px-6 lg:px-12 py-10 gap-10">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <Image
          src={Operations}
          alt="operations"
          className="object-contain contrast-100 w-full max-w-md cursor-pointer"
        />
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-[43%] flex">
        <div className="w-full lg:w-[80%] flex flex-col gap-8">
          {operationsData.map((item) => (
            <div key={item.id} className="w-full flex items-center lg:justify-between md:justify-between sm:justify-center gap-5">
              <div className="text-[#FF8300] text-4xl sm:text-5xl lg:text-6xl font-semibold">
                {item.number}
              </div>
              <div className="text-sm sm:text-base lg:text-[16px] leading-relaxed w-[70%]">
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OperationsSection;
