import React from "react";
import Upernavbar from "@/app/component/navbar/upernavbar";
import SideNavbar from "@/app/component/navbar/sidenavbar";
import MainData from "@/app/component/order/orderdata";
import ProtectedRoute from "@/app/component/protectedroute";

const page = () => {
  return (
<ProtectedRoute>
     <div className="h-[100vh] w-full ">
      <div className='lg:flex md:hidden sm:hidden hidden'>
          <SideNavbar />
   <div className='w-full flex flex-col'>
         <Upernavbar pagename="Orders" />
          <MainData />
   </div>
      </div>
      <div className='lg:hidden md:flex sm:flex flex flex-col w-full' >
          <SideNavbar />
       <Upernavbar pagename="Orders" />
 <MainData />
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default page;
