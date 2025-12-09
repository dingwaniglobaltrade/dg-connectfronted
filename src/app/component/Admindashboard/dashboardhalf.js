"use client";
import React, { useEffect, useState } from "react";
import Dropdown from "@/app/component/Admindashboard/dropdown";
import Barchart from "@/app/component/Admindashboard/chart";
import Table from "@/app/component/Admindashboard/table";
import { createColumnHelper } from "@tanstack/react-table";
import { formatDate } from "@/app/utils/date";
import Link from "next/link";

import { asyncfetchproduct } from "@/app/store/Actions/productAction";
import { fetchAttendanceAction } from "@/app/store/Actions/attendanceAction";
import { asyncfetchOrders } from "@/app/store/Actions/orderAction";
import { useDispatch } from "react-redux";

const columnHelper = createColumnHelper();

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

const DashboardHalf = ({ lable, link }) => {
  const [product, setProducts] = useState("");
  const [attendance, setattendance] = useState("");
  const [orders, setOrders] = useState("");
  const dispatch = useDispatch();
  const [attendaceDate, setAttendaceDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 3;

  // 🗓️ Set today's date on mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // format: YYYY-MM-DD
    setAttendaceDate(today);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(
          asyncfetchOrders({ page: currentPage, limit: pageSize })
        );
        if (result) {
          setOrders(result.data);
          setTotalPages(result.totalPages);
          setTotalCount(result.totalOrders);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };
    fetchData();
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    const fetchData = async () => {
      if (!attendaceDate) return;
    //  console.log({ attendaceDate });

      try {
        const result = await dispatch(
          fetchAttendanceAction({
            date: attendaceDate,
            page: currentPage + 1, // backend expects 1-based
            limit: pageSize,
          })
        );

        if (result?.data) {
          setattendance(result.data);
          setTotalPages(result.totalPages);
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchData(attendaceDate, currentPage);
  }, [attendaceDate, currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(asyncfetchproduct());
        if (result && result.products) {
          setProducts(result.products);
        }
       
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, [dispatch]);


  const columns1 = [
    columnHelper.accessor("ProductName", {
      header: "Product",
      enableSorting: true,
      cell: (info) => {
        const row = info.row.original;

        // Find first media of type IMAGE
        const firstImage = row.media?.find((m) => m.type === "IMAGE");

        return (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() =>
              window.open(`/portalpages/allproduct/${row.id}`, "_blank")
            }
          >
            {firstImage ? (
              <img
                src={firstImage.url}
                alt="product"
                className="w-8 h-8 rounded"
              />
            ) : (
              <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                N/A
              </div>
            )}
            <span className="text-primary hover:underline">
              {row.ProductName}
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor("ProductPrice", {
      header: "Price",
      cell: (info) => `₹ ${info.getValue()}`,
    }),
    columnHelper.accessor("Active", {
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

  // const columns2 = [
  //   columnHelper.accessor(
  //     (row) => row.salesperson?.name || selected.name || "N/A", // safe accessor
  //     {
  //       id: "employeeName", // required when using a function accessor
  //       header: "Employee Name",
  //       cell: (info) => info.getValue(),
  //     }
  //   ),
  //   columnHelper.accessor("id", {
  //     header: "Employee ID",
  //     cell: (info) => info.getValue(),
  //   }),
  //   columnHelper.accessor("InTime", {
  //     header: "Login Time",
  //     cell: (info) => formatDate(info.getValue(), true), // true = include time
  //   }),
  //   columnHelper.accessor("OutTime", {
  //     header: "Logout Time",
  //     cell: (info) => formatDate(info.getValue(), true), // true = include time
  //   }),
  //   columnHelper.accessor("orders", {
  //     header: "Orders",
  //     cell: (info) => info.getValue(),
  //   }),
  // ];

  
  const columns3 = [
    //  columnHelper.accessor("id", {
    //     header: "Order Id",
    //     enableSorting: true,
    //     cell: (info) => {
    //       const row = info.row.original;

    //       return (
    //         <span
    //           className="text-primary hover:underline cursor-pointer"
    //           onClick={() =>
    //             window.open(`/viewpages/orderDetailes/${row.id}`, "_blank")
    //           }
    //         >
    //           {row.id}
    //         </span>
    //       );
    //     },
    //   }),
    columnHelper.display({
      id: "Customer",
      header: "Customer",
      cell: (info) => {
        const row = info.row.original;
        return (
          row.RetailerCustomer?.shopName ||
          row.DistributorCustomer?.name ||
          row.UserCustomer?.name ||
          "Unknown"
        );
      },
    }),
    columnHelper.display({
      id: "Mobile",
      header: "Mobile",
      cell: (info) => {
        const row = info.row.original;
        return (
          row.RetailerCustomer?.mobile ||
          row.DistributorCustomer?.mobile ||
          row.UserCustomer?.mobile ||
          "Unknown"
        );
      },
    }),
    columnHelper.accessor("totalPrice", {
      header: "Total",
      cell: (info) => `₹${info.getValue()}`,
    }),
    columnHelper.accessor("PaymentStatus", {
      header: "Payment Status",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("createdAt", {
      header: "Order Date",
      cell: (info) => formatDate(info.getValue(), true),
    }),
    columnHelper.accessor("orderStatus", {
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
      <Table columns={columns1} data={product.slice(0, 3)} />
    ),
    Attendance: <Table columns={columns2} data={data2.slice(0, 3)} />,
    "Order Status": <Table columns={columns3} data={orders.slice(0, 3)} />,
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
