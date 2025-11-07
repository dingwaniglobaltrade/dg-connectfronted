"use client"
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const Table = ({ columns, data }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
});

return (
    <div className="py-1.5 rounded-[16px] overflow-x-auto border-[2px]">
      <table className="min-w-full text-left border border-[#DCDCDD] rounded-[12px] overflow-hidden">
        <thead className="bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-[#DCDCDD]">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 lg:text-[12px] md:text-[12px] sm:text-[10px] text-[8px] font-semibold text-[#05004E]"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-[#DCDCDD]">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="h-12 px-2 lg:text-[12px] md:text-[12px] sm:text-[10px] text-[8px] text-[#05004E] align-middle"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
