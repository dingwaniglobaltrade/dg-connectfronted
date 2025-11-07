// RetailerForm.jsx
"use client";
import React from "react";

const RetailerForm = ({ formValues, handleChange, handleSubmit }) => {
  return (
    <form
      className="text-[15px] lg:space-y-2 md:space-y-3 space-y-2"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-flow-col grid-rows-5 lg:grid-rows-5 md:grid-rows-5 lg:space-y-3 md:space-y-3 space-y-2">
        {/* Example Retailer specific fields */}
        <div>
          <label className="block text-[13px] font-medium">Shop Name</label>
          <input
            type="text"
            name="shopName"
            value={formValues.shopName}
            onChange={handleChange}
            className="mt-1 block w-[90%] border rounded-[6px] px-2 py-1.5 bg-blue-50 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            className="mt-1 block w-[90%] border rounded-[6px] px-2 py-1.5 bg-blue-50 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formValues.mobile}
            readOnly
            disabled
            title="This field is not editable"
            onChange={handleChange}
            className="mt-1 block w-[90%] border rounded-[6px] px-2 py-1.5 bg-blue-50 focus:outline-none cursor-not-allowed bg-gray-100"
          />
        </div>
        {/* GSTN */}
        <div>
          <label className="block text-[13px] font-medium">GSTN</label>
          <input
            type="text"
            name="gstn"
            value={formValues.gstn}
            readOnly
            disabled
            title="This field is not editable"
            onChange={handleChange}
            className="mt-1 block w-[90%] border rounded-[6px] px-2 py-1.5 bg-blue-50 focus:outline-none cursor-not-allowed bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium">
            Complete Address
          </label>
          <input
            type="text"
            name="address"
            value={formValues.address}
            onChange={handleChange}
            className="mt-1 block w-[90%] border rounded-[6px] px-2 py-1.5 bg-blue-50 focus:outline-none"
          />
        </div>
      </div>

      <div className="pt-3">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default RetailerForm;
