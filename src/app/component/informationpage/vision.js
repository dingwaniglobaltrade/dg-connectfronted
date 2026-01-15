"use client";
import React from "react";
import Image from "next/image";
import VisionSVG from "@/icons/informationpage/vision.svg";
import EarthGlobe from "@/icons/informationpage/EarthGlobe.svg";
import Member from "@/icons/informationpage/Member.svg";
import Prize from "@/icons/informationpage/Prize.svg";
import Favorite from "@/icons/informationpage/Favorite.svg";

const Vision = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-10">
      <div
        className="shadow-md bg-[#ED7A031A] rounded-[35px] w-full max-w-7xl mx-auto
        flex flex-col items-center text-center py-3 sm:py-10 gap-6"
      >
        {/* Header */}
        <div className="flex flex-col items-center">
          <Image
            src={VisionSVG}
            alt="Vision Goal"
            className="w-14 sm:w-16 h-auto cursor-pointer"
          />

          <h1
            className="text-lg sm:text-xl md:text-2xl xl:text-[26px]
            px-4 font-bold py-2 text-black rounded-[10px]"
          >
            Our Vision
          </h1>

          <p
            className="text-[#818080] text-sm sm:text-base md:text-lg
            px-2 sm:px-10 md:px-20 mb-2 max-w-4xl"
          >
            To create India’s most trusted FMCG-connected ecosystem where
            Dingwani Foods, distributors, and retailers grow together—with
            technology, transparency, and trust at the core.
          </p>
        </div>

        {/* Values */}
        <div
          className="
          grid grid-cols-2
          sm:grid-cols-2
          md:grid-cols-4
          gap-8 sm:gap-12 md:gap-20
          text-[#818080]
        "
        >
          {[
            { icon: Prize, label: "Excellence" },
            { icon: EarthGlobe, label: "Global Impact" },
            { icon: Member, label: "Partnership" },
            { icon: Favorite, label: "Sustainability" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-2"
            >
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 bg-[#D9D9D9]
                rounded-full flex justify-center items-center"
              >
                <Image src={item.icon} alt={item.label} className="cursor-pointer" />
              </div>
              <h4 className="text-sm sm:text-base font-medium">{item.label}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vision;
