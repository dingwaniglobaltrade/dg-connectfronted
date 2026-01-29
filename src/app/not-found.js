import React from "react";
import SideNavbar from "@/app/component/navbar/sidenavbar";

const page = () => {
  return (
    <div className="h-[100vh] w-full bg-[#f8f9fa]">
      <div className="flex">
        <div className="w-full h-screen flex flex-col justify-center  text-primary items-center font-semibold">
          <div className="text-[30px] flex items-center justify-center">
            Coming Soon
          </div>
          <div className="text-[15px] ">We are working on it</div>
        </div>
      </div>
    </div>
  );
};

export default page;
