import React from "react";
import Card from "./esist-card";
import Car from "@/icons/informationpage/Cars.png";
import Maps from "@/icons/informationpage/Maps.png";
import World from "@/icons/informationpage/Worldf.png";

const exist = () => {
  return (
    <div className="w-full bg-white flex flex-col lg:gap-10 md:gap-7 sm:gap-4 gap-4 justify-center text-center items-center py-5 px-4 lg:px-10 md:px-10">
      <h1 className="text-[20px] bg-primary px-4 font-light text-white py-2 rounded-[10px]">
        Why Dingwani Connects Exists?
      </h1>
      <p className="text-[#818080] lg:text-[22px] md:text-[20px] sm:text-[18px] text-[18px]">
        The FMCG ecosystem thrives on speed, trust, and consistency. Dingwani
        Connects ensures that:
      </p>
      <div
        className="w-full flex lg:flex-row md:flex-row sm:flex-col flex-col lg:justify-between
       md:justify-between sm:justify-center justify-center items-center gap-4
      px-10"
      >
        <Card
          viewlogo={Car}
          text="Every distributor is directly connected to Dingwani Foods"
        />
        <Card
          viewlogo={Maps}
          text="Every retailer receives real-time updates, schemes, and support"
        />
        <Card
          viewlogo={World}
          text="The entire network operates with clarity, transparency, and efficiency"
        />
      </div>
    </div>
  );
};

export default exist;
