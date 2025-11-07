import React from "react";
import Upernavbar from "@/app/component/navbar/upernavbar";
import SideNavbar from "@/app/component/navbar/sidenavbar";
import ProtectedRoute from "@/app/component/protectedroute";

const page = () => {
  return (
    <ProtectedRoute>
    <div className="h-[100vh] w-full overflow-hidden">
      <div className="flex">
        <SideNavbar />
        <div className="w-full flex flex-col">
          <Upernavbar pagename="Customers" />
     
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default page;
