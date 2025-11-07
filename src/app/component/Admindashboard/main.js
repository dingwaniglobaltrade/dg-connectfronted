"use client";
import React, { useEffect, useState } from "react";
import Blocks from "@/app/component/Admindashboard/block";
import Anlytics from "@/app/component/Admindashboard/anlytics";

import totalordersIcon from "@/icons/dashboard/totalorders.svg";
import Products from "@/icons/dashboard/productsold.svg";
import Revenue from "@/icons/dashboard/revenue.svg";
import NewCustomer from "@/icons/dashboard/newcustomer.svg";
import { asyncfetchOrders } from "@/app/store/Actions/orderAction";
import { useDispatch } from "react-redux";

const main = () => {
  const dispatch = useDispatch();

  const [totalorders, setTotalorders] = useState([]);

  useEffect(() => {
    const fetchorders = async () => {
      try {
        const result = await dispatch(asyncfetchOrders({ page: 1, limit: 10 }));
        console.log({ result });

        if (result?.totalOrders) {
          setTotalorders(result.totalOrders);
        }
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
    fetchorders();
  }, [dispatch]);

  return (
    <div className="h-[90%] lg:w-full md:w-full sm:w-screen bg-[#f8f9fa] overflow-hidden">
      <div className="flex flex-col items-center gap-2 h-full">
        <div className="bg-[#ffff] lg:flex hidden flex-wrap w-[97%] gap-2 justify-evenly mt-4 rounded-[16px] items-center py-4 sticky">
          <Blocks
            icon={totalordersIcon}
            lable={"Total orders"}
            value={totalorders}
            text={"Total Orders"}
            bgColor="bg-[#ffe2e5]"
            width="w-[270px]"
            jus="justify-left"
            pl="pl-7"
          />
          <Blocks
            icon={Products}
            lable={"Revenue"}
            value={"150"}
            text={"Revenue"}
            bgColor="bg-[#dcfce7]"
            width="w-[270px]"
            jus="justify-left"
            pl="pl-7"
          />
          <Blocks
            icon={Revenue}
            lable={"Product Sold"}
            value={"150"}
            text={"Product Sold"}
            bgColor="bg-[#FFF4DE]"
            width="w-[270px]"
            jus="justify-left"
            pl="pl-7"
          />
          <Blocks
            icon={NewCustomer}
            lable={"New Customers"}
            value={"150"}
            text={"New Customer"}
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
