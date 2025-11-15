import React from "react";
import Upernavbar from "@/app/component/navbar/upernavbar";
import ProtectedRoute from "@/app/component/protectedroute";
import SideNavbar from "@/app/component/navbar/sidenavbar";
import DynamicDetailes from "@/app/component/useable/DaynamicDetailesComponents/daynamicDetailesPage";

const Page = () => {
  return (
    <ProtectedRoute>
      <div className="h-[100vh] w-full ">
        <div className="lg:flex md:hidden sm:hidden hidden">
          <SideNavbar />
          <div className="w-full flex flex-col">
            <Upernavbar pagename="Details" />
            <DynamicDetailes />
          </div>
        </div>
        <div className="lg:hidden md:flex sm:flex flex flex-col w-full">
          <SideNavbar />
          <Upernavbar pagename="Details" />
          <DynamicDetailes />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
