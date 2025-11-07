import React from 'react'

const DropdownMenu = ({ options = [] }) => (
  <div className="absolute top-6 right-0 bg-white border rounded shadow-md text-xs z-50 w-24">
    {options.map((opt, i) => (
      <button
        key={i}
        className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
          opt.danger ? "text-red-500" : ""
        }`}
        onMouseDown={opt.action}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

export default DropdownMenu