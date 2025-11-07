import React from "react";
import Image from "next/image";

const block = ({ icon, lable, value, text, bgColor, width, jus, pl }) => {
  return (
    <div
      className={`${width} h-[90px] ${bgColor} rounded-[12px] flex ${jus} items-center gap-5 ${pl}`}
    >
      <div>
        <Image src={icon} alt={lable} height={60} width={60} />
      </div>
      <div className="flex flex-col">
        <div className="font-semibold text-[25px] text-texthearder">
          {value}
        </div>
        <div className="font-medium text-[15px] text-[#1D2433]">{text}</div>
      </div>
    </div>
  );
};

export default block;
