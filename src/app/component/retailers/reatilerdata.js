"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Searchbtn from "@/app/component/useable/FormSearchbtn";
import Table from "@/app/component/useable/peginationTable";
import Action from "@/icons/attendance/action.svg";
import { createColumnHelper } from "@tanstack/react-table";
import useIsMobile from "@/app/customhooks/mobileview";
import { useDispatch, useSelector } from "react-redux";
import DropdownMenu from "../useable/dropdown1";

import {
  asyncfetchretailer,
  deleteRetailerAction,
} from "@/app/store/Actions/retailerAction";
import S3Image from "@/app/component/useable/S3Image";

const columnHelper = createColumnHelper();

const Main = () => {
  // ---------------- STATE ----------------
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const [showRetailerModal, setShowRetailerModal] = useState(false);

  const [retailersData, setRetailersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState(""); // Search
  const [activeFilter, setActiveFilter] = useState("all"); // Filter

  const dropdownRefs = useRef({});
  const isMobile = useIsMobile();
  const dispatch = useDispatch();

  const pageSize = 8;
  const user = useSelector((state) => state.login.admin);
  const userRole = user?.userType;

  // ---------------- FETCH DATA ----------------

  const refreshRetailers = async () => {
    try {
      const result = await dispatch(
        asyncfetchretailer({ page: currentPage, limit: pageSize }),
      );

      if (result) {
        setRetailersData(result.retailers || []);
        setTotalPages(result.totalPages || 1);
        setTotalCount(result.count || 0);
      }
    } catch (error) {
      console.error("Error refreshing retailer list:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(
          asyncfetchretailer({ page: currentPage, limit: pageSize }),
        );

        if (result) {
          setRetailersData(result.retailers || []);
          setTotalPages(result.totalPages || 1);
          setTotalCount(result.count || 0);
        }
      } catch (error) {
        console.error("Error fetching retailer data:", error);
      }
    };

    fetchData();
  }, [dispatch, currentPage, pageSize]);

  // ---------------- SEARCH + FILTER ----------------
  const getFilteredData = () => {
    let filtered = retailersData;

    // Filter
    if (activeFilter !== "all") {
      filtered = filtered.filter(
        (item) => item.status?.toLowerCase() === activeFilter,
      );
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.shopName?.toLowerCase().includes(q) ||
          item.mobile?.toLowerCase().includes(q) ||
          item.gstn?.toLowerCase().includes(q) ||
          item.address?.toLowerCase().includes(q),
      );
    }

    return filtered;
  };

  const filteredData = getFilteredData();

  // ---------------- HANDLERS ----------------
  const toggleAllRows = (checked) => {
    const newSelection = {};
    filteredData.forEach((row) => {
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

  const handleEdit = (row) => {
    setSelectedRetailer(row);
    setShowRetailerModal(true);
  };

  const handleDelete = async (row) => {
    try {
      const result = await dispatch(deleteRetailerAction(row.id));
      if (result?.success) {
        await refreshRetailers();
        setRetailersData((prev) =>
          prev.filter((retailer) => retailer.id !== row.id),
        );
      }
    } catch (error) {
      console.error("Error deleting retailer:", error);
    }
  };

  // ---------------- TABLE COLUMNS ----------------
  const columns = [
    columnHelper.accessor("shopName", {
      header: "Shop Name",
      cell: (info) => {
        const row = info.row.original;
        const imageKey = row.shopImage;
   const canOpen =
        userRole === "admin" || userRole === "subadmin";

      const handleClick = () => {
        if (!canOpen) return;
        window.open(
          `/portalpages/detailes/retailer/${row.id}`,
          "_blank"
        );
      };
        return (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleClick}
          >
            {imageKey ? (
              <div className="w-8 h-8 relative">
                <S3Image
                  s3Key={imageKey}
                  alt="Shop"
                  className="object-cover rounded"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                N/A
              </div>
            )}
            <span className="text-primary hover:underline">{row.shopName}</span>
          </div>
        );
      },
    }),
    columnHelper.accessor("email", { header: "Email" }),
    ...(userRole === "admin" || userRole === "subadmin"
      ? [columnHelper.accessor("password", { header: "Password" })]
      : []),
    columnHelper.accessor("mobile", { header: "Mobile" }),
    columnHelper.accessor("name", { header: "Concern Person" }),
    columnHelper.accessor("address", {
      header: "Address",
      cell: (info) => (
        <div className="whitespace-normal break-words max-w-[200px]">
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.display({
      id: "livelocation",
      header: "Live Location",
      cell: ({ row }) => {
        const { latitude, longitude } = row.original;
        if (!latitude || !longitude) {
          return <span className="text-gray-400">N/A</span>;
        }
        return (
          <a
            href={`https://www.google.com/maps?q=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View on Map
          </a>
        );
      },
    }),
    ...(userRole === "admin" || userRole === "subadmin"
      ? [
          columnHelper.accessor("icon", {
            header: "Action",
            cell: ({ row }) => {
              const rowId = row.original.id;
              const isOpen = openDropdownId === rowId;
              return (
                <div
                  key={rowId}
                  className="relative"
                  ref={(el) => {
                    if (isOpen) dropdownRefs.current[rowId] = el;
                  }}
                >
                  <Image
                    src={Action}
                    alt="icon"
                    className="w-5 h-5 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdownId((prev) =>
                        prev === rowId ? null : rowId,
                      );
                    }}
                  />
                  {isOpen && (
                    <DropdownMenu
                      options={[
                        {
                          label: "Edit",
                          action: () => handleEdit(row.original),
                        },
                        {
                          label: "Delete",
                          action: () => handleDelete(row.original),
                          danger: true,
                        },
                      ]}
                    />
                  )}
                </div>
              );
            },
          }),
        ]
      : []),
  ];

  // ---------------- RENDER ----------------
  return (
    <div className="h-[90%] w-full bg-[#f8f9fa] lg:px-1 md:px-5 px-2 pt-4 flex flex-col gap-3">
      <div className="w-full h-[96%] lg:px-6 md:px-6 px-2">
        <div className="h-full w-full bg-white flex flex-col rounded-[10px]">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between mt-4 px-4 items-center gap-3">
            {/* Left: Title & Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="text-[12px] font-medium">
                All Retailers
                <span className="ml-2 bg-[#F3F9FF] px-2 py-1 border border-[#DDE8F4] rounded-[4px]">
                  {totalCount}
                </span>
              </div>
            </div>

            {/* Right: Search + Add */}
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Search retailer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              />
              <Searchbtn
                btntext={"Add Retailer"}
                initialData={selectedRetailer}
                isEditMode={!!selectedRetailer}
                display="flex"
                onClick={() => setShowRetailerModal(true)}
                onSuccess={refreshRetailers}
              />
            </div>
          </div>

          {/* Table */}
          <div className="lg:px-4 md:px-4 px-2 h-[90%] overflow-auto scroll-smooth">
            {filteredData.length === 0 ? (
              <div className="h-full flex justify-center items-center text-gray-500">
                No retailers found.
              </div>
            ) : (
              <Table
                columns={columns}
                data={filteredData}
                pageIndex={currentPage - 1}
                pageSize={pageSize}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page + 1)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
