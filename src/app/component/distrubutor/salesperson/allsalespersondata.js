"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Searchbtn from "@/app/component/useable/FormSearchbtn";
import Table from "@/app/component/useable/table";
import Action from "@/icons/attendance/action.svg";
import DropdownMenu from "@/app/component/useable/dropdown1";
import AssignRouteForm from "@/app/component/useable/forms/assignRouteForm";
import { fetchAllSalespersonsbyDistributor } from "@/app/store/Actions/salespersonAction";
import { createColumnHelper } from "@tanstack/react-table";
import useIsMobile from "@/app/customhooks/mobileview";
import { useDispatch } from "react-redux";

const columnHelper = createColumnHelper();

const Main = () => {
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [Staff, setstaff] = useState([]);

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
        const result = await dispatch(fetchAllSalespersonsbyDistributor());
        if (result) {
          setstaff(result.data);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchStaff();
  }, [dispatch]);

  const handleAssignRoute = (row) => {
    setSelectedStaffForRoute(row);
    setShowAssignRouteModal(true);
  };

  console.log(Staff);

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => {
        const row = info.row.original;
        return <span>{info.getValue()}</span>;
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
    // columnHelper.accessor("totalOrders", {
    //   header: "Total Orders",
    //   cell: (info) => info.getValue(),
    // }),
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
                console.log(row.original.id);
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
          <div className="lg:px-4 md:px-4 px-2 h-[90%] overflow-auto scroll-smooth mt-10">
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
