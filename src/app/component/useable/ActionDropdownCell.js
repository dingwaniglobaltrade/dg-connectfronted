"use client";
import React, { useRef } from "react";
import Image from "next/image";
import PortalDropdown from "@/app/component/useable/dropdown";

const ActionDropdownCell = ({ row, openDropdownId, setOpenDropdownId }) => {
  const iconRef = useRef(null);
  const isOpen = openDropdownId === row.id;

  return (
    <div className="relative">
      <Image
        ref={iconRef}
        src={row.icon}
        alt="icon"
        className="w-5 h-5 cursor-pointer"
        onClick={() =>
          setOpenDropdownId((prev) => (prev === row.id ? null : row.id))
        }
      />
      {isOpen && (
        <PortalDropdown anchorRef={iconRef} onClose={() => setOpenDropdownId(null)}>
          {["Accepted", "Shipped", "Track", "Delivered", "Cancelled"].map((label) => (
            <button
              key={label}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => {
                console.log(`${label}:`, row.id);
                setOpenDropdownId(null);
              }}
            >
              {label}
            </button>
          ))}
        </PortalDropdown>
      )}
    </div>
  );
};

export default ActionDropdownCell;
