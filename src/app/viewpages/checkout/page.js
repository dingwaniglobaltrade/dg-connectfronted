import React from "react";
import Script from "next/script";
import Upernavbar from "@/app/component/navbar/upernavbar";
import SideNavbar from "@/app/component/navbar/sidenavbar";
import CheckoutData from "@/app/component/checkout/checkoutdata";
import ProtectedRoute from "@/app/component/protectedroute";

const page = () => {
  return (
    <ProtectedRoute>
        <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
     <div className="h-[100vh] w-full ">
      <div className='lg:flex md:hidden sm:hidden hidden'>
          <SideNavbar />
   <div className='w-full flex flex-col'>
         <Upernavbar pagename="Check-out Page" />
          <CheckoutData />
   </div>
      </div>
      <div className='lg:hidden md:flex sm:flex flex flex-col w-full' >
          <SideNavbar />
       <Upernavbar pagename="Check-out Page" />
 <CheckoutData />
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default page;
