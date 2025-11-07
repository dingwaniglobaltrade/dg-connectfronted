"use client";
import React, { useState } from "react";
import Dropdown from "@/app/component/Admindashboard/dropdown";
import Barchart from "@/app/component/Admindashboard/chart";
import Table from "@/app/component/Admindashboard/table";
import { createColumnHelper } from "@tanstack/react-table";

import Link from "next/link";

const columnHelper = createColumnHelper();

const data1 = [
  {
    id: 1,
    product: "Strawberry Wafer Bites (Pack of 4)",
    image: "https://cdn-icons-png.flaticon.com/512/1247/1247730.png",
    price: 50,
    status: "Inactive",
    sold: "10 Pcs",
    totalearning: "₹ 200.00",
  },
  {
    id: 2,
    product: "Pistachio Wafer Cone",
    image: "https://cdn-icons-png.flaticon.com/512/1247/1247730.png",
    price: 50,
    status: "Inactive",
    sold: "10 Pcs",
    totalearning: "₹ 200.00",
  },
  {
    id: 3,
    product: "Chocolate Wafer Cone",
    image: "https://cdn-icons-png.flaticon.com/512/1247/1247730.png",
    price: 50,
    status: "Inactive",
    sold: "10 Pcs",
    totalearning: "₹ 200.00",
  },
];

const data2 = [
  {
    id: 1,
    employename: "John",
    image1: "https://cdn-icons-png.flaticon.com/512/1247/1247730.png",
    employeID: "#123451",
    login: "10:00 AM",
    logout: "06:00 AM",
    orders: "20",
  },
  {
    id: 2,
    employename: "John",
    image1: "https://cdn-icons-png.flaticon.com/512/1247/1247730.png",
    employeID: "#123451",
    login: "10:00 AM",
    logout: "06:00 AM",
    orders: "20",
  },
  {
    id: 3,
    employename: "John",
    image1: "https://cdn-icons-png.flaticon.com/512/1247/1247730.png",
    employeID: "#123451",
    login: "10:00 AM",
    logout: "06:00 AM",
    orders: "20",
  },
];

const data3 = [
  {
    orderId: "#123451",
    customer: "Mark john",
    amount: "50",
    payment: "Card",
    orderDate: "April 02, 2024",
    status: "Pending",
  },
  {
    orderId: "#123451",
    customer: "Mark john",
    amount: "50",
    payment: "COD",
    orderDate: "April 02, 2024",
    status: "Completed",
  },
  {
    orderId: "#123451",
    customer: "Mark john",
    amount: "50",
    payment: "UPI",
    orderDate: "April 02, 2024",
    status: "Cancelled",
  },
];
const DashboardHalf = ({ lable, link }) => {
  const columns1 = [
    columnHelper.accessor("product", {
      header: "Product",
      cell: (info) => {
        const row = info.row.original;
        return (
          <div className="flex items-center gap-2">
            <img src={row.image} alt="product" className="w-8 h-8 rounded" />
            <span>{row.product}</span>
          </div>
        );
      },
    }),
    columnHelper.accessor("price", {
      header: "Price",
      cell: (info) => `₹ ${info.getValue()}`,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <span className="text-[#F04438] bg-[#FFEDED] border border-[#F04438] px-2 py-[5px] text-[10px] rounded-[8px] ">
          Disable
        </span>
      ),
    }),
    columnHelper.accessor("sold", {
      header: "Sold",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("totalearning", {
      header: "Total Earning",
      cell: (info) => info.getValue(),
    }),
  ];

  const columns2 = [
    columnHelper.accessor("employename", {
      header: "Employee Name",
      cell: (info) => {
        const row = info.row.original;
        return (
          <div className="flex items-center gap-2">
            <img
              src={row.image1}
              alt="employeImage"
              className="w-8 h-8 rounded"
            />
            <span>{row.employename}</span>
          </div>
        );
      },
    }),
    columnHelper.accessor("employeID", {
      header: "Employee ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("login", {
      header: "Login Time",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("logout", {
      header: "Logout Time",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("orders", {
      header: "Orders",
      cell: (info) => info.getValue(),
    }),
  ];

  const columns3 = [
    columnHelper.accessor("orderId", {
      header: "Order ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("customer", {
      header: "Customer",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) => `₹ ${info.getValue()}`,
    }),
    columnHelper.accessor("payment", {
      header: "Payment Method",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("orderDate", {
      header: "Order Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue(); // e.g., "Pending", "Completed", "Cancelled"

        let bgColor = "";
        let borderColor = "";
        let textColor = "";

        if (status === "Pending") {
          bgColor = "bg-[#EDF4FF]";
          textColor = "text-[#2F80ED]";
          borderColor = "border-[#2F80ED]";
        } else if (status === "Completed") {
          bgColor = "bg-[#E8F8EF]";
          textColor = "text-[#39BA74]";
          borderColor = "border-[#39BA74]";
        } else if (status === "Cancelled") {
          bgColor = "bg-[#FFEDED]";
          textColor = "text-[#EB5757]";
          borderColor = "border-[#EB5757]";
        } else {
          bgColor = "bg-gray-100";
          textColor = "text-[#2F80ED]";
          borderColor = "border-gray-300";
        }

        return (
          <span
            className={`px-2 py-[5px] text-[10px] rounded-[8px] border ${bgColor} ${textColor} ${borderColor}`}
          >
            {status}
          </span>
        );
      },
    }),
  ];

  const componentsMap = {
    "Sales Analytics": <Barchart />,
    "Top Selling Products": (
      <Table columns={columns1} data={data1.slice(0, 3)} />
    ),
    Attendance: <Table columns={columns2} data={data2.slice(0, 3)} />,
    "Order Status": <Table columns={columns3} data={data3.slice(0, 3)} />,
  };

  const renderContent = () => componentsMap[lable] || <div>Not available</div>;

  return (
    <div className="w-[90%] sm:w-[80%] md:w-[80%] lg:w-[49%] h-full bg-white rounded-[16px] mt-2 shadow-lg px-3">
      <div className="w-full h-full flex flex-col justify-evenly">
        <div className="flex justify-between items-center px-5 pt-2">
          <div className="text-[#05004E] lg:text-[16px] md:text-[16px] sm:text-[12px] text-[10px] font-semibold">
            {lable}
          </div>
          {/* <Dropdown /> */}
        </div>
        <Link href={link}>
          <div className="px-5 pb-3">{renderContent()}</div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHalf;
