"use client";
import React, { useEffect, useState } from "react";
import Searchbtn from "@/app/component/useable/FormSearchbtn";
import Table from "@/app/component/useable/peginationTable";
import useIsMobile from "@/app/customhooks/mobileview";
import { createColumnHelper } from "@tanstack/react-table";
import { fetchsalespersonwiseattendance } from "@/app/store/Actions/attendanceAction";
import { fetchCurrentUser } from "@/app/store/Actions/loginAction";
import { useDispatch } from "react-redux";

const columnHelper = createColumnHelper();

const Main = () => {
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [salespernAttendance, setsalespernAttendance] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const [currentPage, setCurrentPage] = useState(0); // 0-based index
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  const toggleAllRows = (checked) => {
    const newSelection = {};
    routeData.forEach((row) => {
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
        const result = await dispatch(fetchCurrentUser());
        if (result) {
          setCurrentUser(result.payload);
        }
      } catch (error) {
        console.error("Error fetching Route data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const userId = currentUser?._id || currentUser?.id;
    if (!userId) return;

    const fetchAttendance = async (id, page) => {
      try {
        const result = await dispatch(
          fetchsalespersonwiseattendance({
            id,
            page: page + 1, // backend expects 1-based
            limit: pageSize,
          })
        );

        if (result) {
          setsalespernAttendance(result.data); // rows
          setTotalPages(result.totalPages); // backend returns this
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchAttendance(userId, currentPage);
  }, [dispatch, currentUser, currentPage]);

  const refreshAttendance = async () => {
    try {
      const userId = currentUser?._id || currentUser?.id;
      if (!userId) return;

      const result = await dispatch(
        fetchsalespersonwiseattendance({
          id: userId,
          page: currentPage + 1, // backend expects 1-based
          limit: pageSize,
        })
      );

      if (result) {
        setsalespernAttendance(result.data || []);
        setTotalPages(result.totalPages || 1);
      }
    } catch (error) {
      console.error("Error refreshing attendance:", error);
    }
  };

  const columns = [
    columnHelper.accessor("createdAt", {
      header: "Date",
      cell: (info) => {
        const date = new Date(info.getValue());
        return date.toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    }),
    columnHelper.accessor("InTime", {
      header: "In-Time",
      cell: (info) => {
        const date = new Date(info.getValue());
        return date.toLocaleString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
      },
    }),
    columnHelper.accessor("OutTime", {
      header: "Out-Time",
      cell: (info) => {
        const value = info.getValue();

        if (!value) return "-"; // <-- FIX

        const date = new Date(value);
        return date.toLocaleString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
      },
    }),
    // Calculate Hours
    {
      id: "workingHours",
      header: "Hours",
      cell: ({ row }) => {
        const inTime = new Date(row.original.InTime);

        const outTime = new Date(row.original.OutTime);

        if (!row.original.InTime || !row.original.OutTime) {
          return "-"; // no data
        }

        const diffMs = outTime - inTime; // difference in milliseconds
        if (diffMs <= 0) return "0h 0m";

        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        return `${hours}h ${minutes}m`;
      },
    },
    columnHelper.accessor("attendanceStatus", {
      header: "Status",
      cell: (info) => info.getValue(),
    }),
  ];

  return (
    <div className="h-[90%] w-full bg-[#f8f9fa] lg:px-1 md:px-5 px-2 pt-4 flex flex-col gap-3">
      <div className="w-full h-[96%] lg:px-6 md:px-6 px-2">
        <div className="h-full w-full bg-white flex flex-col rounded-[10px]">
          <div className="flex justify-end gap-3 mt-4 lg:px-4 md:px-4 px-2 items-center gap-5">
            <Searchbtn
              btntext={"Add In-Entry"}
              display="flex"
              onSuccess={refreshAttendance}
            />
            <Searchbtn
              btntext={"Add Out-Entry"}
              display="flex"
              onSuccess={refreshAttendance}
            />
          </div>

          <div className="lg:px-4 md:px-4 px-2 h-[90%] overflow-auto scroll-smooth">
            <Table
              columns={columns}
              data={salespernAttendance}
              pageIndex={currentPage}
              pageSize={pageSize}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
