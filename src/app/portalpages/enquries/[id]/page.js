import React from "react";
import Upernavbar from "@/app/component/navbar/upernavbar";
import SideNavbar from "@/app/component/navbar/sidenavbar";
import Detailes from "@/app/component/enquries/detailespage";
import ProtectedRoute from "@/app/component/protectedroute";
import { use } from "react";

const page = ({ params }) => {
  const { id } = use(params);

  console.log({ id });

  return (
    <ProtectedRoute>
      <div className="h-[100vh] w-full ">
        <div className="lg:flex md:hidden sm:hidden hidden">
          <SideNavbar />
          <div className="w-full flex flex-col">
            <Upernavbar pagename="Enquries" />
            <Detailes id={id} />
          </div>
        </div>
        <div className="lg:hidden md:flex sm:flex flex flex-col w-full">
          <SideNavbar />
          <Upernavbar pagename="Enquries" />
          <Detailes id={id} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default page;
