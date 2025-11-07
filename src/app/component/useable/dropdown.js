"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const PortalDropdown = ({ anchorRef, children, onClose }) => {
  const dropdownRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Calculate position of dropdown relative to the anchor element
  useEffect(() => {
    const anchor = anchorRef.current;
    const dropdown = dropdownRef.current;

    if (anchor && dropdown) {
      const rect = anchor.getBoundingClientRect();
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollX = window.scrollX || document.documentElement.scrollLeft;

      // Set position with a little offset below the anchor
      setPosition({
        top: rect.bottom + scrollY + 4,
        left: rect.left + scrollX,
      });
    }
  }, [anchorRef]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !anchorRef.current?.contains(event.target)
      ) {
        onClose();
      }
    };

  document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, anchorRef]);

  return createPortal(
    <div
      ref={dropdownRef}
      style={{ top: position.top, left: position.left }}
      className="absolute z-[9999] min-w-[120px] bg-white bg-red-500 border border-gray-200 rounded shadow-md text-xs animate-scaleFade origin-top-right"
    >
      {children}
    </div>,
    document.body
  );
};

export default PortalDropdown;
