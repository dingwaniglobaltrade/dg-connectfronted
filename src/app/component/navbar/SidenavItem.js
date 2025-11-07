import React from "react";
import Image from "next/image";
import { iconMap } from "@/app/utils/constants/iconMap";

const SidenavItem = ({ item, isActive, onClick }) => {
  const Icon = iconMap[item.iconKey];

  return (
    <div
      onClick={onClick}
      className={`min-w-[80px] h-12 group flex lg:flex-row md:flex-row flex-col items-center gap-2 px-3 rounded-lg cursor-pointer transition-all duration-200
      hover:bg-primary hover:text-white hover:font-semibold
      ${
        isActive
          ? "bg-primary text-white font-semibold"
          : "bg-transparent text-black"
      }`}
    >
      <Image
        src={Icon}
        alt={item.label}
        height={20}
        width={20}
        className={`object-cover transition duration-200  lg:h-[20px] lg:w-[20px] h-[26px] w-[26px]

        ${
          isActive ? "invert brightness-0" : "brightness-0 group-hover:invert"
        }`}
      />
      <span className="lg:text-[14px] text-[8px] whitespace-nowrap">
        {item.label}
      </span>
    </div>
  );
};

export default SidenavItem;
