"use client";
import React, { useState } from "react";
import Image from "next/image";
import LogoImage from "@/icons/dgtlogo.svg";
import { LuMenu } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";

const UpperNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white">
      {/* DESKTOP NAVBAR (UNCHANGED) */}
      <div
        className="hidden lg:flex font-medium text-primary w-full h-[10vh] py-12
        flex-row gap-28 justify-center items-center"
      >
         <Link href="#home" className="cursor-pointer">
          Home
        </Link>
        <Link href="#about" className="cursor-pointer">
          About Us
        </Link>
        <div className="w-[150px]">
          <Image src={LogoImage} alt="logo image" className="cursor-pointer" />
        </div>
        <Link href="#vision" className="cursor-pointer">
          Vision
        </Link>
        <div className="cursor-pointer px-8 rounded-[10px] py-1.5 bg-primary text-white">
          <Link href={"/login"}>Login</Link>
        </div>
      </div>

      {/* MOBILE + TABLET NAVBAR */}
      <div className="lg:hidden flex items-center justify-between px-4 h-16">
        <Image src={LogoImage} alt="logo image" className="w-24" />

        <button
          onClick={() => setOpen(!open)}
          className="text-primary"
          aria-label="Toggle menu"
        >
          {open ? <RxCross2 size={28} /> : <LuMenu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden flex flex-col gap-4 px-6 py-4 font-medium text-primary bg-white shadow-md">
          <div onClick={() => setOpen(false)}>Home</div>
          <div onClick={() => setOpen(false)}>About Us</div>
          <div onClick={() => setOpen(false)}>Divisions</div>
          <div onClick={() => setOpen(false)}> <Link href={"/login"}>Login</Link></div>
        </div>
      )}
    </header>
  );
};

export default UpperNavbar;
