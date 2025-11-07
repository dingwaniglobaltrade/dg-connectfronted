"use client";
import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

const Table = ({
  columns,
  data,
  pageIndex,
  pageSize,
  totalPages,
  onPageChange,
}) => {
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: { pageIndex, pageSize },
      sorting,
    },
    onSortingChange: setSorting,
    manualPagination: true, // important for server-side pagination
    pageCount: totalPages, // backend total pages
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const rows = table.getRowModel().rows;

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block py-1.5 rounded-[10px] border-[2px] mt-3 overflow-x-auto ">
        <table className="min-w-full text-left">
          <thead className="bg-white">
            {table.getHeaderGroups().map((headerGroup, groupIndex) => (
              <tr key={headerGroup.id} className="border-b border-[#DCDCDD]">
                {headerGroup.headers.map((header) => (
                  <th
                    key={`${groupIndex}_${header.id}`}
                    onClick={header.column.getToggleSortingHandler()}
                    className="p-2 text-[12px] font-semibold text-[#05004E] select-none"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc"
                      ? " 🔼"
                      : header.column.getIsSorted() === "desc"
                      ? " 🔽"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-[#DCDCDD] text-[12px] cursor-pointer ">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={`${row.id}_${cell.id}`}
                    className="h-12 px-2 text-[#05004E] align-middle"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 px-4 text-sm text-texthearder bg-transparent">
          <div>
            Page {pageIndex + 1} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(pageIndex - 1)}
              disabled={pageIndex === 0}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => onPageChange(pageIndex + 1)}
              disabled={pageIndex + 1 >= totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3 mt-5">
        {rows.map((row) => (
          <div
            key={row.id}
            className="border border-[#DCDCDD] rounded-lg p-4 bg-white shadow-sm grid sm:grid-cols-3 grid-cols-2"
          >
            {row.getVisibleCells().map((cell) => (
              <div key={cell.id} className="mb-2">
                <div className="text-[10px] font-semibold text-gray-500">
                  {flexRender(cell.column.columnDef.header, cell.getContext())}
                </div>
                <div className="text-[11px] text-[#05004E]">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Pagination - same as desktop */}
        <div className="flex items-center justify-between mt-4 px-4 text-sm text-texthearder bg-transparent">
          <div>
            Page {pageIndex + 1} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(pageIndex - 1)}
              disabled={pageIndex === 0}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => onPageChange(pageIndex + 1)}
              disabled={pageIndex + 1 >= totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
