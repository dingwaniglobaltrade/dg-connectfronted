"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import Table from "@/app/component/useable/peginationTable";
import Calander from "@/app/component/attendance/calander";
import Searchbtn from "@/app/component/useable/FormSearchbtn";
import Action from "@/icons/attendance/action.svg";
import DropdownMenu from "../useable/dropdown1";
import { createColumnHelper } from "@tanstack/react-table";
import useIsMobile from "@/app/customhooks/mobileview";
import {
  fetchsalespersonwiseattendance,
  fetchAttendanceAction,
  deleteSalespersonAttendance,
} from "@/app/store/Actions/attendanceAction";
import { fetchAllSalespersons } from "@/app/store/Actions/salespersonAction";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { formatDate } from "@/app/utils/date";

const columnHelper = createColumnHelper();

const main = () => {
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [fetchedAtte, setFetchedAtte] = useState([]);
  const [attendaceDate, setAttendancedate] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(true);
  const [salespersons, setSalespersons] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [salespersonwise, setSalespersonwise] = useState([]);
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const router = useRouter();

  const dropdownRefs = useRef({});
  const selectDropdownRef = useRef();

  const [currentPage, setCurrentPage] = useState(0); // 0-based index
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  // Handle outside click for Action dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownElements = Object.values(dropdownRefs.current);
      const clickedInsideAny = dropdownElements.some((ref) =>
        ref?.contains(event.target)
      );
      if (!clickedInsideAny) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle outside click for salesperson dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectDropdownRef.current &&
        !selectDropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchSalespersonsData = async () => {
      try {
        const result = await dispatch(fetchAllSalespersons());

        if (result?.salesperson) {
          setSalespersons(result.salesperson);
        }
      } catch (error) {
        console.error("Error fetching salespersons:", error);
      }
    };
    fetchSalespersonsData();
  }, [dispatch]);

  const handleSelect = async (salesperson) => {
    setSelected(salesperson);
    setIsOpen(false);

    try {
      const result = await dispatch(
        fetchsalespersonwiseattendance({
          id: salesperson.id,
          page: currentPage + 1, // backend expects 1-based
          limit: pageSize,
        })
      );

      if (result) {
        setSalespersonwise(result.data); // rows
        setTotalPages(result.totalPages); // backend response
      }
    } catch (error) {
      console.error("Error fetching salesperson-wise attendance:", error);
    }
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const fetchData = async () => {
      if (!attendaceDate) return;

      try {
        const result = await dispatch(
          fetchAttendanceAction({
            date: attendaceDate,
            page: currentPage + 1, // backend expects 1-based
            limit: pageSize,
          })
        );

        if (result?.data) {
          setFetchedAtte(result.data);
          setTotalPages(result.totalPages);
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchData(attendaceDate, currentPage);
  }, [attendaceDate, currentPage]);

  const handleEdit = (row) => {
    setSelectedAttendance(row);
    setOpenEditModal(true);
  };

  const handledelete = async (row) => {
    try {
      const result = await dispatch(deleteSalespersonAttendance(row.id));
      if (result?.success) {
        setFetchedAtte((prev) => prev.filter((a) => a.id !== row.id));
      }
    } catch (error) {
      toast.error;
      console.error("Error deleting Attendance:", error);
    }
  };

  const columns = [
    columnHelper.accessor(
      (row) => row.salesperson?.name || selected.name || "N/A", // safe accessor
      {
        id: "employeeName", // required when using a function accessor
        header: "Employee Name",
        cell: (info) => info.getValue(),
      }
    ),
    columnHelper.accessor("id", {
      header: "Employee ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("InTime", {
      header: "Login Time",
      cell: (info) => formatDate(info.getValue(), true), // true = include time
    }),
    columnHelper.accessor("OutTime", {
      header: "Logout Time",
      cell: (info) => formatDate(info.getValue(), true), // true = include time
    }),
    columnHelper.accessor("totalhours", {
      header: "Total Hours",
      cell: ({ row }) => {
        const inTime = new Date(row.original.InTime);
        const outTime = new Date(row.original.OutTime);

        if (!inTime || !outTime || isNaN(inTime) || isNaN(outTime)) return "-";

        let diffMs = outTime - inTime;

        // If OutTime is earlier, assume it's the next day
        if (diffMs < 0) {
          diffMs += 24 * 60 * 60 * 1000; // add 24 hrs
        }

        const totalMinutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")} hrs`;
      },
    }),
    columnHelper.accessor("InTimeCurrentLocation", {
      header: "In Address",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("OutTimeCurrentLocation", {
      header: "Out Address",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("attendanceStatus", {
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

  const refreshAttendance = async () => {
    if (selected) {
      const result = await dispatch(
        fetchsalespersonwiseattendance({
          id: selected.id,
          page: currentPage + 1,
          limit: pageSize,
        })
      );

      if (result) {
        setSalespersonwise(result.data);
        setTotalPages(result.totalPages);
      }
    } else if (attendaceDate) {
      const result = await dispatch(
        fetchAttendanceAction({
          date: attendaceDate,
          page: currentPage + 1,
          limit: pageSize,
        })
      );

      if (result) {
        setFetchedAtte(result.data);
        setTotalPages(result.totalPages);
      }
    }
  };

  return (
    <div className="h-[90%] w-full lg:px-7 md:px-5 px-2 py-4 bg-[#f8f9fa]">
      <div className="lg:px-6 md:px-6 px-2 h-full bg-white flex flex-col rounded-[10px]">
        <div className="mt-5 w-full flex justify-between lg:flex-row md:flex-row flex-col">
          <Calander setAttendancedate={setAttendancedate} />
          <div className="flex flex-wrap gap-4 items-center lg:mt-0 md:mt-0 mt-2">
            <div ref={selectDropdownRef}>
              <div className="relative inline-block text-left">
                <button
                  onClick={toggleDropdown}
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {selected ? selected.name : "Select Salesperson"}
                </button>
                {isOpen && (
                  <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {salespersons.map((sp) => (
                        <button
                          key={sp.id}
                          onClick={() => handleSelect(sp)}
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        >
                          {sp.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {openEditModal && (
              <Searchbtn
                btntext="Add Attendance"
                initialData={selectedAttendance}
                isEditMode={true}
                display="flex"
                onSuccess={refreshAttendance}
              />
            )}
          </div>
        </div>
        <div className="h-[90%]">
          <div className="h-full ">
            {selected ? (
              salespersonwise.length > 0 ? (
                <Table
                  columns={columns}
                  gridview={"grid-cols-4"}
                  data={salespersonwise}
                  pageIndex={currentPage}
                  pageSize={pageSize}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              ) : (
                <div className="flex justify-center items-center h-full text-gray-500">
                  No records found for this salesperson on selected date
                </div>
              )
            ) : fetchedAtte.length > 0 ? (
              <Table
                columns={columns}
                data={fetchedAtte}
                gridview={"grid-cols-4"}
                pageIndex={currentPage}
                pageSize={pageSize}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            ) : (
              <div className="flex justify-center items-center h-full text-gray-500">
                No attendance records found for this date
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default main;
