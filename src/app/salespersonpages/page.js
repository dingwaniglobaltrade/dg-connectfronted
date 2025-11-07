import React from "react";
import Upernavbar from "@/app/component/navbar/upernavbar";
import SideNavbar from "@/app/component/navbar/sidenavbar";
import SalespersonDashboard from "@/app/component/salesperson/salespersonDashboardCom/salespersonDashboardpage";
import ProtectedRoute from "@/app/component/protectedroute";

const Page = () => {
  return (
     <ProtectedRoute>
     <div className="h-[100vh] w-full ">
      <div className='lg:flex md:hidden sm:hidden hidden'>
          <SideNavbar />
   <div className='w-full flex flex-col'>
         <Upernavbar pagename="Dashbaord" />
          <SalespersonDashboard />
   </div>
      </div>
      <div className='lg:hidden md:flex sm:flex flex flex-col w-full' >
          <SideNavbar />
       <Upernavbar pagename="Dashbaord" />
 <SalespersonDashboard />
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default Page;
