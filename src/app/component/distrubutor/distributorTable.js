"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Searchbtn from "@/app/component/useable/FormSearchbtn";
import Table from "@/app/component/useable/peginationTable";
import Action from "@/icons/attendance/action.svg";
import { createColumnHelper } from "@tanstack/react-table";
import useIsMobile from "@/app/customhooks/mobileview";
import { useDispatch } from "react-redux";
import DropdownMenu from "../useable/dropdown1";
import AssignModal from "@/app/component/useable/forms/assignSalespersonForm";
import {
  fetchAllDistributor,
  deleteDistributor,
} from "@/app/store/Actions/distributorAction";
import { toast } from "react-toastify";

import SearchFilter from "@/app/component/useable/searchfiled";
import S3Image from "@/app/component/useable/S3Image";

const columnHelper = createColumnHelper();

const Main = () => {
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const isMobile = useIsMobile();
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(true);
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const dropdownRefs = useRef({});

  const dispatch = useDispatch();
  const [distributorData, setDistributordata] = useState([]);
  const [tableData, setTableData] = useState([]); // ✅ holds search result data

  const [
    selectedDistributorForSalesperson,
    setSelectedDistributorForSalesperson,
  ] = useState(null);
  const [showAssignSalespersonModal, setShowAssignSalespersonModal] =
    useState(false);

  const [mode, setMode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  const [totalCount, settotalCount] = useState([]);

  const toggleAllRows = (checked) => {
    const newSelection = {};
    distributorData.forEach((row) => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(
          fetchAllDistributor({ page: currentPage, pageSize }),
        );

        if (result) {
          setDistributordata(result.distributors);
          setTotalPages(result.totalPages);
          settotalCount(result.count);
        }
      } catch (error) {
        console.error("Error fetching distributor data:", error);
      }
    };

    fetchData();
  }, [dispatch, currentPage, pageSize]);

  const refreshDistributor = async () => {
    const result = await dispatch(
      fetchAllDistributor({ page: currentPage, pageSize }),
    );

    if (result) {
      setDistributordata(result.distributors);
      setTotalPages(result.totalPages);
      settotalCount(result.count);
    }
  };

  const handleEdit = (row) => {
    setSelectedRetailer(row);
    setOpenEditModal(true);
  };

  const handledelete = async (row) => {
    try {
      const result = await dispatch(deleteDistributor(row.id));

      if (result?.success) {
        await refreshDistributor();
        setDistributordata((prevDistributor) =>
          prevDistributor.filter((distributor) => distributor.id !== row.id),
        );
        toast.success("Distributor deleted successfully");
      } else {
        toast.error("Failed to delete Distributor");
      }
    } catch (error) {
      console.error("Error deleting distributor:", error);
    }
  };

  const handleAssignSalesperson = (row) => {
    setSelectedDistributorForSalesperson(row);
    setMode("salesperson");
    setShowAssignSalespersonModal(true);
  };

  const handleAssignRoute = (row) => {
    setSelectedDistributorForSalesperson(row);
    setMode("route");
    setShowAssignSalespersonModal(true);
  };

  //get search results
  const handleDataFetched = (result) => {
    if (result?.data) {
      setTableData(result.data);
    } else {
      setTableData([]);
    }
  };

  //Decide which data to render
  const finalData = tableData.length > 0 ? tableData : distributorData;

  const columns = [
    columnHelper.accessor("firmName", {
      header: "Firm Name",
      enableSorting: true,
      cell: (info) => {
        const row = info.row.original;

        // S3 key stored in DB (example: 1768897643426-opss.png)
        const imageKey = row.profileImage || null;

        return (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() =>
              window.open(
                `/portalpages/detailes/distributor/${row.id}`,
                "_blank",
              )
            }
          >
            {imageKey ? (
              <div className="w-8 h-8 relative">
                <S3Image
                  s3Key={imageKey}
                  alt="product"
                  className="object-cover rounded"
                />
              </div>
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

    columnHelper.accessor("mobile", {
      header: "Mobile",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("gstn", {
      header: "GSTN",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Concern Person ",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("address", {
      header: "Address",
      cell: (info) => {
        const address = info.row.original.address?.[0];
        if (!address) return "N/A";
        return `${address.complectAddress || ""} ${address.city || ""} ${
          address.pincode || ""
        } ${address.stateName || ""}`;
      },
    }),
    columnHelper.accessor("password", {
      header: "Password ",
      cell: (info) => info.getValue(),
    }),
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
                setOpenDropdownId((prev) => (prev === rowId ? null : rowId));
              }}
            />
            {isOpen && (
              <DropdownMenu
                options={[
                  {
                    label: "Assign Salesperson",
                    action: () => handleAssignSalesperson(row.original),
                    danger: false,
                  },
                  {
                    label: "Assign Route",
                    action: () => handleAssignRoute(row.original),
                    danger: false,
                  },
                  {
                    label: "Edit",
                    action: () => handleEdit(row.original),
                    danger: false,
                  },
                  {
                    label: "Delete",
                    action: () => handledelete(row.original),
                    danger: true,
                  },
                ]}
              />
            )}
          </div>
        );
      },
    }),
  ];

  return (
    <div className="h-[90%] w-full bg-[#f8f9fa] lg:px-1 md:px-5 px-2 pt-4 flex flex-col gap-3">
      <div className="w-full h-[96%] lg:px-6 md:px-6 px-2">
        <div className="h-full w-full bg-white flex flex-col rounded-[10px] ">
          <div className="flex justify-between mt-4 px-4 items-center lg:flex-row md:flex-row flex-col">
            <div className="flex gap-3 items-center">
              <div className="text-[12px] font-medium">
                All Distributor
                <span className="ml-2 lg:bg-[#F3F9FF] md:bg-[#F3F9FF] bg-transparent lg:px-1 py-2 lg:border-[1px] lg:border-[#DDE8F4] md:border-[1px] md:border-[#DDE8F4] border-transparent border-none rounded-[4px]">
                  {totalCount}
                </span>
              </div>
            </div>
            <div className="lg:mt-0 md:mt-0 mt-2 flex gap-3">
              {/* SearchFilter for distributor */}
              <SearchFilter
                model="Distributors"
                filterOptions={["All", "Active", "Inactive"]}
                onDataFetched={handleDataFetched}
              />
              {openEditModal && (
                <Searchbtn
                  btntext={"Add Distributor"}
                  initialData={selectedRetailer}
                  isEditMode={true}
                  display="flex"
                  onSuccess={refreshDistributor}
                />
              )}
            </div>
          </div>
          <div className="lg:px-4 md:px-4 px-2 h-[90%] overflow-auto scroll-smooth ">
            {finalData.length === 0 ? (
              <div className="h-full flex justify-center items-center text-gray-500">
                No distributors found.
              </div>
            ) : (
              <Table
                columns={columns}
                data={finalData}
                pageIndex={currentPage - 1}
                pageSize={pageSize}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page + 1)}
              />
            )}
          </div>

          {showAssignSalespersonModal && (
            <AssignModal
              distributor={selectedDistributorForSalesperson}
              onClose={() => setShowAssignSalespersonModal(false)}
              mode={mode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
