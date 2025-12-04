"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Searchbtn from "@/app/component/useable/FormSearchbtn";
import Table from "@/app/component/useable/peginationTable";
import DropdownMenu from "../useable/dropdown1";
import useIsMobile from "@/app/customhooks/mobileview";
import Action from "@/icons/attendance/action.svg";
import { createColumnHelper } from "@tanstack/react-table";
import SearchFilter from "@/app/component/useable/searchfiled";
import {
  asyncfetchroute,
  asyncfetchroutewiseSalesperson,
  deleteRouteAction,
} from "@/app/store/Actions/routeAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const columnHelper = createColumnHelper();

const Main = () => {
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const isMobile = useIsMobile();
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(true);
  const dispatch = useDispatch();
  const [routeData, setRoutedata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const dropdownRefs = useRef({});

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;
  const [totalCount, settotalCount] = useState(0);

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

  const fetchData = async () => {
    try {
      const result = await dispatch(
        asyncfetchroutewiseSalesperson({ page: currentPage, limit: pageSize })
      );
      if (result) {
        setRoutedata(result.routes);
        setFilteredData(result.routes);
        setTotalPages(result.totalPages);
        settotalCount(result.totalRecords);
      }
    } catch (error) {
      console.error("Error fetching Route data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, currentPage]);

  const handleEdit = (row) => {
    setSelectedRoute(row);
    setOpenEditModal(true);
  };

  const handledelete = async (row) => {
    try {
      console.log({row: row});
      
      const result = await dispatch(deleteRouteAction(row.routeId));
      if (result?.success) {
        const updatedData = routeData.filter((route) => route.id !== row.id);
        setRoutedata(updatedData);
        setFilteredData(updatedData);
      } else {
        console.error("Failed to delete route:", result?.message);
      }
    } catch (error) {
      console.error("Error deleting route:", error);
    }
  };

  // Columns definition
  const columns = [

    columnHelper.accessor("routeName", {
      header: "Route",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("distributor", {
      header: "Assigned Distributor",
     cell: (info) => {
    const distributor = info.getValue();
    if (!distributor) return "—";

    return distributor.name || "—";
  },
    }),
    columnHelper.accessor("retailerCount", {
      header: "Retailers",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("salespersons", {
      header: "Assigned Salesperson",
      cell: (info) => {
        const salespersons = info.getValue();
        if (!salespersons || salespersons.length === 0) return "—";
        return salespersons.map((sp) => sp.name).join(", ");
      },
    }),
    columnHelper.accessor("icon", {
      header: "Action",
      cell: ({ row }) => {
        const rowId = row.original.routeId;
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
                setOpenDropdownId((prev) => (prev === rowId ? null : rowId));
              }}
            />
            {isOpen && (
              <DropdownMenu
                options={[
                  { label: "Edit", action: () => handleEdit(row.original) },
                  { label: "Delete", action: () => handledelete(row.original), danger: true },
                ]}
              />
            )}
          </div>
        );
      },
    }),
  ];

  // Handle data fetched from SearchFilter
  const handleDataFetched = (data) => {
    setFilteredData(data);
  };

  return (
    <div className="h-[90%] w-full bg-[#f8f9fa] lg:px-1 md:px-5 px-2 pt-4 flex flex-col gap-3">
      <div className="w-full h-[96%] lg:px-6 md:px-6 px-2">
        <div className="h-full w-full bg-white flex flex-col rounded-[10px]">
          {/* Header */}
          <div className="flex justify-between mt-4 px-4 items-center lg:flex-row md:flex-row flex-col gap-2">
            <div className="flex gap-3 items-center flex-wrap">
              <div className="text-[12px] font-medium">
                All Routes
                <span className="ml-2 lg:bg-[#F3F9FF] md:bg-[#F3F9FF] bg-transparent lg:px-1 py-2 lg:border-[1px] lg:border-[#DDE8F4] md:border-[1px] md:border-[#DDE8F4] border-transparent border-none rounded-[4px]">
                  {totalCount}
                </span>
              </div>
              {/* SearchFilter component */}
              <SearchFilter
                model="Routes"
                filterOptions={["All", "Active", "Inactive"]}
                onDataFetched={handleDataFetched}
              />
            </div>

            {/* Add Route button */}
            <div className="lg:mt-0 md:mt-0 mt-2">
              <Searchbtn
                btntext={"Add Route"}
                initialData={openEditModal ? selectedRoute : null}
                isEditMode={openEditModal}
                display="flex"
              />
            </div>
          </div>

          {/* Table */}
          <div className="lg:px-4 md:px-4 px-2 h-[90%] overflow-auto scroll-smooth">
            <Table
              columns={columns}
              data={filteredData}
              pageIndex={currentPage - 1}
              pageSize={pageSize}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page + 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
