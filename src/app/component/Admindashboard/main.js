"use client";
import React, { useEffect, useState } from "react";
import Blocks from "@/app/component/Admindashboard/block";
import Anlytics from "@/app/component/Admindashboard/anlytics";

import totalordersIcon from "@/icons/dashboard/totalorders.svg";
import Products from "@/icons/dashboard/productsold.svg";
import Revenue from "@/icons/dashboard/revenue.svg";
import NewCustomer from "@/icons/dashboard/newcustomer.svg";
import {
  FYofDistributorOrder,
  MonthlySalesofDistributorOrder,
} from "@/app/store/Actions/orderAction";
import { retailersCount } from "@/app/store/Actions/retailerAction";
import { useDispatch } from "react-redux";

const main = () => {
  const dispatch = useDispatch();

  const [currentMonthSales, setCurrentMonthSales] = useState(0);
  const [currentMonthName, setCurrentMonthName] = useState("");
  const [yearlySales, setYearlySales] = useState(0);
  const [todayRetailerCount, setTodayRetailerCount] = useState("");
  const [totalDistributors, setTodalDistributor] = useState("");

  // FY Sales
  useEffect(() => {
    const fetchyearlysale = async () => {
      const result = await dispatch(FYofDistributorOrder());
      if (result?.data?.totalSales) {
        setYearlySales(result.data.totalSales);
      }
      if (result?.data?.totalDistributors) {
        setTodalDistributor(result.data.totalDistributors);
      }
    };

    fetchyearlysale();
  }, [dispatch]);

  useEffect(() => {
    const fetchMonthlysale = async () => {
      try {
        const result = await dispatch(MonthlySalesofDistributorOrder());
        const monthlyData = result?.data?.monthlyData;

        if (!monthlyData || monthlyData.length === 0) return;

        // sort by month (YYYY-MM)
        const sorted = [...monthlyData].sort(
          (a, b) => new Date(a.month) - new Date(b.month),
        );

        const latest = sorted[sorted.length - 1];

        setCurrentMonthSales(latest.totalSales);
        setCurrentMonthName(
          new Date(latest.month + "-01").toLocaleString("default", {
            month: "long",
            year: "numeric",
          }),
        );
      } catch (err) {
        console.error("Error fetching monthly sales", err);
      }
    };

    fetchMonthlysale();
  }, [dispatch]);

  useEffect(() => {
    const fetchRetailercount = async () => {
      const result = await dispatch(retailersCount());

      if (result?.payload?.data?.todayRetailers) {
        setTodayRetailerCount(result.payload.data.todayRetailers);
      }
    };

    fetchRetailercount();
  }, [dispatch]);

  return (
    <div className="h-[90%] lg:w-full md:w-screen sm:w-screen bg-[#f8f9fa] overflow-hidden">
      <div className="flex flex-col items-center gap-2 h-full">
        <div className="bg-[#ffff] lg:flex hidden flex-wrap w-[97%] gap-2 justify-evenly mt-4 rounded-[16px] items-center py-4 sticky">
          <Blocks
            icon={totalordersIcon}
            lable={"Total Revenue"}
            value={yearlySales}
            text={"Total Revenue"}
            bgColor="bg-[#ffe2e5]"
            width="w-[270px]"
            jus="justify-left"
            pl="pl-7"
          />
          <Blocks
            icon={Products}
            lable={`Revenue (${currentMonthName || "This Month"})`}
            value={currentMonthSales}
            text={"Monthly Revenue"}
            bgColor="bg-[#dcfce7]"
            width="w-[270px]"
            jus="justify-left"
            pl="pl-7"
          />
          <Blocks
            icon={Revenue}
            lable={"Product Sold"}
            value={totalDistributors}
            text={"Distributor Count"}
            bgColor="bg-[#FFF4DE]"
            width="w-[270px]"
            jus="justify-left"
            pl="pl-7"
          />
          <Blocks
            icon={NewCustomer}
            lable={"New Customers"}
            value={todayRetailerCount}
            text={"New Retailers"}
            bgColor="bg-[#f3e8ff]"
            width="w-[270px]"
            jus="justify-left"
            pl="pl-7"
          />
        </div>

        <Anlytics />
      </div>
    </div>
  );
};

export default main;
