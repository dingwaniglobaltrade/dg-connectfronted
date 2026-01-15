import React from "react";
import Image from "next/image";
import PlanLogo from "@/icons/informationpage/planlogo.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary rounded-t-[30px] mt-12 px-6 sm:px-10 lg:px-20 py-10 sm:py-16 text-white">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-center lg:text-left">
          Let’s Connect Here
        </h1>

        <button className="bg-[#FD853A] uppercase px-6 sm:px-10 py-2 text-sm sm:text-base lg:text-lg rounded-full font-medium hover:opacity-90 transition">
          <Link href={"/login"}>Login</Link>
        </button>
      </div>

      <div className="border-b-[1px]  border-t-[1px] border-grey-500 py-4">
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Logo & Description */}
          <div className="flex flex-col gap-4 md:w-[45%]">
            <Image
              src={PlanLogo}
              alt="Dingwani logo"
              className="h-14 w-28 object-contain cursor-pointer"
            />
            <p className="text-sm sm:text-base leading-relaxed">
              Join the Dingwani Network. Be part of a smarter, faster, and more
              connected way of doing business.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              Dingwani Connects — Connecting Growth. Empowered by Dingwani
              Foods.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[#FD853A] font-semibold">Links</h3>
            <a href="#" className="hover:underline">
              Home
            </a>
            <a href="#" className="hover:underline">
              About Us
            </a>
            <a href="#" className="hover:underline">
              Division
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[#FD853A] font-semibold">Contact</h3>
            <p>+91 8269968097</p>
            <p>info@dingwanifoods.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
