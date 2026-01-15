"use client";
import React from "react";
import Image from "next/image";
import Mobile from "@/icons/informationpage/loginmob.png";

const AboutSection = () => {
  return (
    <section className="w-full bg-primary">
      <div
        className="
          min-h-[85vh]
          max-w-7xl
          mx-auto
          flex flex-col-reverse
          lg:flex-row
          items-center
          gap-5
          px-6
          sm:px-10
          md:px-16
          lg:px-14
       
        "
      >
        {/* Text Content */}
        <div className="text-white flex flex-col justify-center lg:gap-8 md:gap-8 sm:gap-4 gap-4 w-full lg:w-1/2 mb-2">
          <h3 className="text-lg sm:text-xl md:text-2xl xl:text-[27px] leading-relaxed">
            Dingwani Connects is the official engagement and operations platform
            by Dingwani Foods, created to align every distributor and retailer
            with the brand’s vision, processes, and growth strategy.
          </h3>

          <h3 className="text-lg sm:text-xl md:text-2xl xl:text-[27px] leading-relaxed">
            From order management to offers, communication to performance
            tracking, everything happens in one place—seamlessly.
          </h3>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src={Mobile}
            alt="Mobile Image"
            className="
              w-[70%]
              sm:w-[60%]
              md:w-[50%]
              lg:w-[70%]
              xl:w-[900px]
              h-auto
              object-contain cursor-pointer
            "
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
