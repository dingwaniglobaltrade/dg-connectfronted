"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Table from "@/app/component/useable/peginationTable";
import useIsMobile from "@/app/customhooks/mobileview";
import SearchFilter from "@/app/component/useable/searchfiled";

import {
  asyncfetchOrders,
  asyncfetchCustomerOrder,
} from "@/app/store/Actions/orderAction";
import { formatDate } from "@/app/utils/date";

import { createColumnHelper } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const columnHelper = createColumnHelper();

const Main = () => {
  const dispatch = useDispatch();
  const dropdownRefs = useRef({});
  const searchRef = useRef(); // control SearchFilter

  // ---------- STATE ----------
  const [tableData, setTableData] = useState([]); // single source of truth
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 7;
  const [totalCount, setTotalCount] = useState(0);

  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const isMobile = useIsMobile();
  const user = useSelector((state) => state.login.admin);
  const userRole = user?.userType;

  // ---------- FETCH NORMAL ORDERS ----------
  useEffect(() => {
    if (!isFiltering) {
      const fetchData = async () => {
        try {
          const result = await dispatch(
            asyncfetchCustomerOrder({ page: currentPage, limit: pageSize })
          );
          if (result) {
            setTableData(result.data);
            setTotalPages(result.totalPages);
            setTotalCount(result.totalOrders);
          }
        } catch (error) {
          console.error("Error fetching order data:", error);
        }
      };
      fetchData();
    }
  }, [dispatch, currentPage, pageSize, isFiltering]);

  // ---------- HANDLE SEARCHFILTER RESULT ----------
  const handleDataFetched = (result) => {
    setTableData(result.data);

    setTotalPages(result.pages);
    setCurrentPage(result.page);
    setIsFiltering(true); // mark filtering active
  };

  // ---------- TABLE SELECTION ----------
  const toggleAllRows = (checked) => {
    const newSelection = {};
    tableData.forEach((row) => {
      newSelection[row.id] = checked;
    });
    setSelectedRowIds(newSelection);
  };

  const toggleRow = (id, checked) => {
    setSelectedRowIds((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  // ---------- DROPDOWN CLOSE ON OUTSIDE CLICK ----------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".filter-dropdown")) {
        setIsFilterDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ---------- FILTER BUTTONS ----------
  const filterButtons = [
    { label: "All Orders", count: tableData.length, value: "all" },
    {
      label: "Pending",
      count: tableData.filter((item) => item.orderStatus === "Pending").length,
      value: "Pending",
    },
    {
      label: "Accepted",
      count: tableData.filter((item) => item.orderStatus === "Accepted").length,
      value: "Accepted",
    },
    {
      label: "Shipped",
      count: tableData.filter((item) => item.orderStatus === "Shipped").length,
      value: "Shipped",
    },
    {
      label: "Track",
      count: tableData.filter((item) => item.orderStatus === "Track").length,
      value: "Track",
    },
    {
      label: "Delivered",
      count: tableData.filter((item) => item.orderStatus === "Delivered")
        .length,
      value: "Delivered",
    },
    {
      label: "Cancelled",
      count: tableData.filter((item) => item.orderStatus === "Cancelled")
        .length,
      value: "Cancelled",
    },
    {
      label: "Return",
      count: tableData.filter((item) => item.orderStatus === "Return").length,
      value: "Return",
    },
  ];

  const filters = [
    {
      key: "PaymentStatus",
      label: "Payment Status",
      options: [
        { value: "paid", label: "Paid" },
        { value: "pending", label: "Pending" },
        { value: "failed", label: "Failed" },
      ],
    },
  ];

  // ✅ Centralized color mapping for statuses
  const getStatusStyles = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-[#E8F8EF] text-[#39BA74] border border-[#39BA74]";
      case "Pending":
        return "bg-[#FFF5E5] text-[#FFA500] border border-[#FFA500]";
      case "Cancelled":
        return "bg-[#FFEDED] text-[#EB5757] border border-[#EB5757]";
      case "Return":
        return "bg-[#E5E5FF] text-[#4A4AE8] border border-[#4A4AE8]";
      case "Delivered":
        return "bg-[#E8F8EF] text-[#2E8B57] border border-[#2E8B57]";
      case "Track":
        return "bg-[#E0F0FF] text-[#007BFF] border border-[#007BFF]";
      case "Shipped":
        return "bg-[#FFF0E0] text-[#FF7F50] border border-[#FF7F50]";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-300";
    }
  };

  // ---------- COLUMNS ----------
  const columns = [
  
    columnHelper.accessor("id", {
      header: "Order Id",
      enableSorting: true,
      cell: (info) => {
        const row = info.row.original;

        return (
          <span
            className="text-primary hover:underline cursor-pointer"
            onClick={() =>
              window.open(`/viewpages/orderDetailes/${row.id}`, "_blank")
            }
          >
            {row.id}
          </span>
        );
      },
    }),
    ,
    columnHelper.accessor("totalPrice", {
      header: "Total",
      cell: (info) => `₹${info.getValue()}`,
    }),
    columnHelper.accessor("ShippingAdress", {
      header: "Shipping Address",
      cell: (info) => `${info.getValue()}`,
    }),
    columnHelper.accessor("createdAt", {
      header: "Date",
      cell: (info) => formatDate(info.getValue(), true),
    }),
    columnHelper.accessor("PaymentStatus", {
      header: "Payment Status",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("orderStatus", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();
        const statusClasses = getStatusStyles(status);
        return (
          <div
            className={`px-3 py-1 rounded-[10px] text-[10px] font-medium text-center w-fit ${statusClasses}`}
          >
            {status}
          </div>
        );
      },
    }),
  ];

  // ---------- RENDER ----------
  return (
    <div className="h-[90%] w-full bg-[#f8f9fa] lg:px-5 md:px-5 px-2 pt-4 flex flex-col gap-3">
      {/* Table */}
      <div className="w-full h-[80%]">
        <div className="h-full w-full bg-white flex flex-col rounded-[10px]">
          <div className="flex justify-between pt-2 px-4 flex-row">
            <div className="flex gap-3 mt-3 w-full flex-wrap justify-between">
              {/* Order status filter dropdown */}
              <div className="relative inline-block filter-dropdown">
                <button
                  onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                >
                  {filterButtons.find((btn) => btn.value === activeFilter)
                    ?.label || "Filter"}
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isFilterDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isFilterDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                    <ul className="py-1 max-h-60 overflow-y-auto text-sm">
                      {filterButtons.map((btn) => (
                        <li key={btn.value}>
                          <button
                            onClick={() => {
                              setActiveFilter(btn.value);
                              setIsFilterDropdownOpen(false);
                            }}
                            className={`flex justify-between items-center w-full px-3 py-2 hover:bg-gray-100 ${
                              activeFilter === btn.value
                                ? "bg-gray-100 font-semibold"
                                : ""
                            }`}
                          >
                            <span>{btn.label}</span>
                            <span className="ml-2 text-xs text-gray-500">
                              ({btn.count})
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* Search + Add Buttons */}
              <div className="lg:mt-0 md:mt-0 mt-0 flex gap-3">
                <div>
                  <SearchFilter
                    ref={searchRef}
                    model="Order"
                    filterOptions={filters}
                    onDataFetched={handleDataFetched}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Data Table */}
          {/* Data Table */}
          <div className="px-4 mb-5 overflow-auto scroll-smooth">
            {(activeFilter === "all"
              ? tableData
              : tableData.filter((item) => item.orderStatus === activeFilter)
            ).length === 0 ? (
              <p className="text-gray-500 text-center py-10 text-sm">
                No data available
              </p>
            ) : (
              <Table
                columns={columns}
                gridview={"grid-cols-4"}
                data={
                  activeFilter === "all"
                    ? tableData
                    : tableData.filter(
                        (item) => item.orderStatus === activeFilter
                      )
                }
                pageIndex={currentPage - 1}
                pageSize={pageSize}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page + 1);
                  if (isFiltering) {
                    searchRef.current?.fetchData();
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
