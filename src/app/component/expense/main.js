"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Searchbtn from "@/app/component/useable/FormSearchbtn";
import Table from "@/app/component/useable/peginationTable";
import useIsMobile from "@/app/customhooks/mobileview";

import DropdownMenu from "../useable/dropdown1";
import Action from "@/icons/attendance/action.svg";
import { createColumnHelper } from "@tanstack/react-table";
import SearchFilter from "@/app/component/useable/searchfiled";
import {
  asyncfetchExpenses,
  updatetheExpenseStatus,
} from "@/app/store/Actions/expenseAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const columnHelper = createColumnHelper();

const Main = () => {
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  const [searchQuery, setSearchQuery] = useState(""); // local search
  const [tableData, setTableData] = useState([]); // SearchFilter API data

  const [currentPage, setCurrentPage] = useState(1); // 1-based index for backend
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const dropdownRefs = useRef({});
  const userRole = useSelector((state) => state.login.admin?.userType);
  const [selectedFilter, setSelectedFilter] = useState("all"); // default

  //show the updaloded image
  const [modalImage, setModalImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(
          asyncfetchExpenses({
            page: currentPage,
            limit: pageSize,
          })
        );
        if (result && result.data) {
          setExpenses(result.data);
          console.log({ result: result.data });

          setTotalPages(result.totalPages);
        }
      } catch (error) {
        console.error("Error fetching expense data:", error);
      }
    };
    fetchData();
  }, [dispatch, currentPage, pageSize]);

  // ---------------- FILTER BUTTONS ----------------
  const filterOptions = [
    { label: "All Expenses", value: "all" },
    { label: "Pending Expenses", value: "Pending" },
    { label: "Accepted Expenses", value: "Accepted" },
    { label: "Approved Expenses", value: "Approved" },
    { label: "Rejected Expenses", value: "Reject" },
  ];

  // ---------------- SEARCH + FILTER (local) ----------------
  const getFilteredData = () => {
    let filtered = expenses;

    if (activeFilter !== "all") {
      filtered = filtered.filter((item) => item.expenseStatus === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.salesperson?.name?.toLowerCase().includes(q) ||
          item.Date?.toLowerCase().includes(q) ||
          item.expenseStatus?.toLowerCase().includes(q)
      );
    }

    return filtered;
  };

  const filteredData = getFilteredData();

  // ---------------- HANDLE SEARCHFILTER RESULT ----------------
  const handleDataFetched = (result) => {
    if (result?.data) {
      setTableData(result.data);
    } else {
      setTableData([]);
    }
  };

  // Final data: prefer SearchFilter results, fallback to local filters
  const finalData = tableData.length > 0 ? tableData : filteredData;

  // ---------------- ACTION HANDLERS ----------------
  const handleAccpect = async (row) => {
    try {
      await dispatch(
        updatetheExpenseStatus(row.id, { expenseStatus: "Accepted" })
      );
      toast.success("Expense Accepted");
      setExpenses((prev) =>
        prev.map((exp) =>
          exp.id === row.id ? { ...exp, expenseStatus: "Accepted" } : exp
        )
      );
    } catch (err) {
      toast.error("Failed to accept expense");
    }
  };

  const handleReject = async (row) => {
    try {
      await dispatch(
        updatetheExpenseStatus(row.id, { expenseStatus: "Reject" })
      );
      toast.success("Expense Rejected");
      setExpenses((prev) =>
        prev.map((exp) =>
          exp.id === row.id ? { ...exp, expenseStatus: "Reject" } : exp
        )
      );
    } catch (err) {
      toast.error("Failed to reject expense");
    }
  };

  const handleApprove = async (row) => {
    try {
      await dispatch(
        updatetheExpenseStatus(row.id, { expenseStatus: "Approved" })
      );
      toast.success("Expense Approved");
      setExpenses((prev) =>
        prev.map((exp) =>
          exp.id === row.id ? { ...exp, expenseStatus: "Approved" } : exp
        )
      );
    } catch (err) {
      toast.error("Failed to approve expense");
    }
  };

  // ---------------- TABLE COLUMNS ----------------
  const columns = [
    columnHelper.accessor("salesperson.name", {
      header: "Name",
      cell: (info) => {
        const row = info.row.original;
        return <span className="cursor-pointer">{info.getValue()}</span>;
      },
    }),
    columnHelper.accessor("Date", { header: "Date" }),
    columnHelper.accessor("TotalkmTravel", { header: "Total KM Travel" }),
    columnHelper.accessor("othersExpense", { header: "Other Expenses" }),
    columnHelper.accessor("StartImage", {
      header: "Start Image / Bill Image",
      cell: (info) => {
        const row = info.row.original;
        const imageUrl = row.StartImage || row.BillImage; // fallback
        if (!imageUrl) return <span className="text-gray-400 italic">N/A</span>;

        return (
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={() => {
              setModalImage(imageUrl);
              setIsModalOpen(true);
            }}
          >
            View Image
          </span>
        );
      },
    }),

    columnHelper.accessor("EndImage", {
      header: "End Image / Payment Proof",
      cell: (info) => {
        const row = info.row.original;
        const imageUrl = row.EndImage || row.Paymentproof; // fallback
        if (!imageUrl) return <span className="text-gray-400 italic">N/A</span>;

        return (
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={() => {
              setModalImage(imageUrl);
              setIsModalOpen(true);
            }}
          >
            View Image
          </span>
        );
      },
    }),

    columnHelper.accessor("expenseStatus", { header: "Status" }),
  ];

  if (userRole === "admin" || userRole === "subadmin") {
    columns.push(
      columnHelper.accessor("icon", {
        header: "Action",
        cell: ({ row }) => {
          const rowId = row.original.id;
          const isOpen = openDropdownId === rowId;
          const status = row.original.expenseStatus;

          const getOptions = () => {
            if (status === "Pending") {
              return [
                { label: "Accept", action: () => handleAccpect(row.original) },
                {
                  label: "Reject",
                  action: () => handleReject(row.original),
                  danger: true,
                },
              ];
            } else if (status === "Accepted") {
              return [
                { label: "Approve", action: () => handleApprove(row.original) },
                {
                  label: "Reject",
                  action: () => handleReject(row.original),
                  danger: true,
                },
              ];
            }
            return null;
          };

          const options = getOptions();
          if (!options)
            return <span className="text-gray-400 italic">N/A</span>;

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
              {isOpen && <DropdownMenu options={options} />}
            </div>
          );
        },
      })
    );
  }

  if (userRole === "salesperson") {
    columns.push(
      columnHelper.accessor("icon", {
        header: "Action",
        cell: ({ row }) => {
          const rowId = row.original.id;
          const isOpen = openDropdownId === rowId;
          const status = row.original.expenseStatus;

          // Only show action if expense is Pending
          if (status !== "Pending") {
            return <span className="text-gray-400 italic">N/A</span>;
          }

          // Options for salesperson: only Edit
          const options = [
            {
              label: "Edit",
              action: () => {
                // You can open your edit modal or navigate to edit page
                console.log("Edit expense:", row.original.id);
                // Example: open modal or redirect
                // setEditExpenseData(row.original);
                // setIsEditModalOpen(true);
              },
            },
          ];

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
              {isOpen && <DropdownMenu options={options} />}
            </div>
          );
        },
      })
    );
  }

  // ---------------- RENDER ----------------
  return (
    <div className="h-[90%] w-full bg-[#f8f9fa] lg:px-0 md:px-5 px-2 pt-4 flex flex-col gap-3">
      <div className="w-full h-[96%] lg:px-6 md:px-6 px-2">
        <div className="h-full w-full bg-white flex flex-col rounded-[10px]">
          {/* Header */}
          <div className="flex lg:flex-row flex-col justify-between mt-4 px-3 gap-3">
            {/* Filter buttons */}
            <div className="relative">
              <select
                value={selectedFilter}
                onChange={(e) => {
                  setSelectedFilter(e.target.value);
                  setActiveFilter(e.target.value); // update your filter function
                  setTableData([]); // reset search results
                }}
                className="border rounded px-1 py-1 focus:outline-none text-[14px]"
            >
                {filterOptions.map((option) => {
                  // calculate count dynamically
                  const count =
                    option.value === "all"
                      ? expenses.length
                      : expenses.filter(
                          (item) => item.expenseStatus === option.value
                        ).length;

                  return (
                    <option key={option.value} value={option.value}>
                      {option.label} ({count})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Search + Add buttons */}
            <div className="flex flex-wrap gap-2 items-center">
              <SearchFilter
                model="Expense" // 👈 backend model key
                filterOptions={[
                  "All",
                  "Pending",
                  "Accepted",
                  "Approved",
                  "Reject",
                ]}
                onDataFetched={handleDataFetched}
              />
              <button
                onClick={() => {
                  setTableData([]);
                  setSearchQuery("");
                }}
                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
              >
                Reset
              </button>
              {userRole === "salesperson" && (
                <>
                  <Searchbtn display={"hidden"} btntext={"Add Expense"} />
                  <Searchbtn display={"hidden"} btntext={"Add Claim"} />
                </>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="lg:px-4 md:px-4 px-2 h-[90%] overflow-auto scroll-smooth">
            {finalData.length === 0 ? (
              <div className="h-full flex justify-center items-center text-gray-500">
                No Expense found.
              </div>
            ) : (
              <Table
                columns={columns}
                gridview={"grid-cols-4"}
                data={finalData}
                pageIndex={currentPage - 1}
                pageSize={pageSize}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page + 1)}
              />
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)} // close modal when clicking outside
        >
          <div
            className="bg-white p-4 rounded max-w-[90%] max-h-[90%] overflow-auto relative"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <img
              src={modalImage}
              alt="Expense"
              className="max-w-full max-h-[80vh] object-contain"
            />
            <button
              className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
