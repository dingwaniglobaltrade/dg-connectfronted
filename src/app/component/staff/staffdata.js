"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Searchbtn from "@/app/component/useable/FormSearchbtn";
import Table from "@/app/component/useable/table";
import Action from "@/icons/attendance/action.svg";
import DropdownMenu from "../useable/dropdown1";
import AssignRouteForm from "@/app/component/useable/forms/assignRouteForm";
import {
  fetchAllStaffData,
  deleteStaffData,
} from "@/app/store/Actions/staffAction";
import { createColumnHelper } from "@tanstack/react-table";
import useIsMobile from "@/app/customhooks/mobileview";
import { useDispatch } from "react-redux";

const columnHelper = createColumnHelper();

const Main = () => {
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(true);
  const [Staff, setstaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const dropdownRefs = useRef({});

  const [showAssignRouteModal, setShowAssignRouteModal] = useState(false);
  const [selectedStaffForRoute, setSelectedStaffForRoute] = useState(null);

  const toggleAllRows = (checked) => {
    const newSelection = {};
    data.forEach((row) => {
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
    const fetchStaff = async () => {
      try {
        const result = await dispatch(fetchAllStaffData());
        if (result) {
          setstaff(result.data);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchStaff();
  }, [dispatch]);

   // Function to refresh staff list
  const refreshStaff = async () => {
    try {
      const result = await dispatch(fetchAllStaffData());
      if (result && result.data) {
        setstaff(result.data);
      }
      console.log("Staff data refreshed:", result?.data);
    } catch (error) {
      console.error("Error refreshing staff data:", error);
    }
  };


  const handleEdit = (row) => {
    setSelectedStaff(row);
    setOpenEditModal(true);
  };

  const handleAssignRoute = (row) => {
    setSelectedStaffForRoute(row);
    setShowAssignRouteModal(true);
  };

  const handledelete = async (row) => {
    try {
      const result = await dispatch(deleteStaffData(row));
      if (result?.success) {
        setstaff((prev) => prev.filter((staff) => staff.id !== row.id));
      } else {
        console.error("Failed to delete staff:", result?.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const columns = [

    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => {
        const row = info.row.original;
        return (
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={() =>
              window.open(`/portalpages/detailes/salesperson/${row.id}`, "_blank")
            }
          >
            {info.getValue()}
          </span>
        );
      },
    }),
    ,
    columnHelper.accessor("mobile", {
      header: "Mobile",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("password", {
      header: "Password",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("totalOrders", {
      header: "Total Orders",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("userType", {
      header: "Status",
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
                  ...(row.original.userType === "salesperson"
                    ? [
                        {
                          label: "Assign Route",
                          action: () => handleAssignRoute(row.original),
                          danger: false,
                        },
                      ]
                    : []),
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
          <div className="flex lg:justify-end md:justify-end justify-center mt-4 px-4 items-center">
            {openEditModal && (
              <Searchbtn
                btntext={"Add Staff"}
                initialData={selectedStaff}
                isEditMode={true}
                display="flex"
                onSuccess={refreshStaff}
              />
            )}
          </div>
          <div className="lg:px-4 md:px-4 px-2 h-[100%] ">
            <Table columns={columns} data={Staff} />
          </div>
          {showAssignRouteModal && (
            <AssignRouteForm
              staff={selectedStaffForRoute}
              onClose={() => setShowAssignRouteModal(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Main;
