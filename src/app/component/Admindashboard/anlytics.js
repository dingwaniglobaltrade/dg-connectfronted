import React from "react";
import DashboardHalf from "@/app/component/Admindashboard/dashboardhalf";

const anlytics = () => {
  return (
    <div className="h-full flex overflow-auto scroll-smooth justify-center">
      <div className="w-full px-4 lg:h-[320px] md:h-full h-full flex flex-wrap lg:gap-5 sm:gap-3 items-center justify-center">
        <DashboardHalf link={"/dbh"} lable={"Sales Analytics"} />
        <DashboardHalf
          link={"/portalpages/allproduct"}
          lable={"Top Selling Products"}
        />
        <DashboardHalf link={"/portalpages/attendance"} lable={"Distributor Leader Board"} />
        <DashboardHalf link={"/portalpages/orders"} lable={"Order Status"} />
      </div>
    </div>
  );
};

export default anlytics;
