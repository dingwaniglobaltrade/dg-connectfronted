"use client";

import Image from "next/image";
import "@/app/css/logoLoader.css";
import LogoSvg from "@/icons/dgtlogo.svg";

const LogoLoader = () => {
  return (
    <div className="logo-loader-container">
      <Image src={LogoSvg} alt="logo" className="logo-svg-loader" />
    </div>
  );
};

export default LogoLoader;
