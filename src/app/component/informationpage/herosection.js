"use client";
import React from "react";
import Image from "next/image";
import WorldMap from "@/icons/informationpage/world-maps.png";
import MainImage from "@/icons/informationpage/mainpage.png";

const HeroSection = () => {
  return (
    <section className="w-full h-[100vh] relative overflow-hidden bg-white">
      {/* Background Map */}
      <Image
        src={WorldMap}
        alt="world map"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 z-20 backgroundcolor flex items-center justify-center">
        <div
          className="flex flex-col-reverse lg:flex-row w-full h-full 
          items-center justify-center px-2 sm:px-2 md:px-10 lg:px-20"
        >
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center lg:items-start items-center text-center lg:text-left lg:pl-12 md:pl-10 sm:pl:0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-[36px] font-medium text-[#FF8300] uppercase">
              One Platform. One Network. Endless Growth.
            </h1>

            <p className="text-base sm:text-lg md:text-xl mt-5 font-normal text-[#292323] max-w-xl">
              Dingwani Connects is a unified digital ecosystem designed to bring
              Dingwani Foods, distributors, and retailers together on a single,
              powerful platform. It simplifies communication, strengthens
              partnerships, and enables smarter growth across the entire supply
              chain.
            </p>

            <button className="mt-6 px-6 py-3 bg-primary text-white rounded-md text-base sm:text-lg">
              Contact Us
            </button>
          </div>

          {/* Main Image */}
          <div className="w-full lg:w-1/2 flex justify-center items-center ">
            <Image
              src={MainImage}
              alt="main image"
              className="w-[70%] sm:w-[50%] md:w-[60%] lg:w-[80%] xl:w-[70%] h-auto cursor-pointer"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
