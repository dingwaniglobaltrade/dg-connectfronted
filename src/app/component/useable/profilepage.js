"use client";

import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "@/app/store/Actions/loginAction";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);
  const admin = loginState?.admin;

  const [editableData, setEditableData] = useState({
    firmName: "",
    shopName: "",
    fullName: "",
    area: "",
    address: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !admin) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, admin]);

  useEffect(() => {
    if (admin) {
      const address = admin.address
        ? `${admin.address.complectAddress || ""}, ${
            admin.address.city || ""
          }, ${admin.address.stateName || ""} - ${admin.address.pincode || ""}`
        : "";

      setEditableData((prev) => ({
        ...prev,
        firmName: admin.firmName || "",
        shopName: admin.shopName || "",
        fullName: admin.name || "",
        area: admin.address?.city || "",
        address,
      }));
    }
  }, [admin]);

  if (!admin) return <p>Loading user data...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated details:", editableData);
    // Dispatch action to save updates
  };

  return (
    <div className="h-auto w-[98%] bg-[#f8f9fa] lg:px-1 md:px-5 px-2 flex flex-col gap-3 py-3">
      <div className="flex items-center gap-5 border-b p-1 px-10">
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover bg-red-500"
        />
        <div>
          <h2 className="text-lg font-semibold">{admin.name || "NA"}</h2>
          <p className="text-gray-500">{admin.email || "NA"}</p>
        </div>
      </div>

      {/* Distributor Form */}
      {admin.userType === "distributor" && (
        <form onSubmit={handleSubmit} className="space-y-3 px-10 text-[13px]">
          {/* Firm Name & GST */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium">Firm Name</label>
              <input
                type="text"
                name="firmName"
                value={editableData.firmName}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium">GST No.</label>
              <input
                type="text"
                value={admin.gstn || "NA"}
                readOnly
                className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-gray-200 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Full Name & Area */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={editableData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium">Area</label>
              <input
                type="text"
                name="area"
                value={editableData.area}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Contact */}
          <h3 className="text-base font-semibold pt-4">Contact Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium">Mail ID</label>
              <input
                type="email"
                value={admin.email || "NA"}
                readOnly
                className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-gray-200 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium">
                Contact No.
              </label>
              <input
                type="tel"
                value={admin.mobile || "NA"}
                readOnly
                className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-gray-200 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-[13px] font-medium">Address</label>
            <textarea
              name="address"
              value={editableData.address}
              onChange={handleChange}
              rows="2"
              className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
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
      )}

      {/* Retailer Form */}
      {admin.userType === "retailer" && (
        <form onSubmit={handleSubmit} className="space-y-3 px-10 text-[13px]">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium">Shop Name</label>
              <input
                type="text"
                name="shopName"
                value={editableData.shopName}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium">GST No.</label>
              <input
                type="text"
                value={admin.gstn || "NA"}
                readOnly
                className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-gray-200 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={editableData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {/* <div>
              <label className="block text-[13px] font-medium">Area</label>
              <input
                type="text"
                name="area"
                value={editableData.area}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div> */}
          </div>

          <h3 className="text-base font-semibold pt-4">Contact Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium">Mail ID</label>
              <input
                type="email"
                value={admin.email || "NA"}
                readOnly
                className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-gray-200 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium">
                Contact No.
              </label>
              <input
                type="tel"
                value={admin.mobile || "NA"}
                readOnly
                className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-gray-200 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium">Address</label>
            <textarea
              name="address"
              value={admin.address}
              onChange={handleChange}
              rows="2"
              className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
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
      )}

        {admin.userType === "salesperson" && (
        <form onSubmit={handleSubmit} className="space-y-3 px-10 text-[13px]">
          <div className="grid md:grid-cols-2 gap-4">
             <div>
              <label className="block text-[13px] font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={editableData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium">Assigned Route</label>
              <input
                type="text"
                value={admin.gstn || "NA"}
                readOnly
                className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-gray-200 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium">Assigned Distributor Name</label>
              <input
                type="text"
                name="fullName"
                value={editableData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {/* <div>
              <label className="block text-[13px] font-medium">Area</label>
              <input
                type="text"
                name="area"
                value={editableData.area}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div> */}
          </div>

          <h3 className="text-base font-semibold pt-4">Contact Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium">Mail ID</label>
              <input
                type="email"
                value={admin.email || "NA"}
                readOnly
                className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-gray-200 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium">
                Contact No.
              </label>
              <input
                type="tel"
                value={admin.mobile || "NA"}
                readOnly
                className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-gray-200 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium">Address</label>
            <textarea
              name="address"
              value={admin.address}
              onChange={handleChange}
              rows="2"
              className="mt-1 block w-full border rounded-lg px-3 py-1.5 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
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
      )}
    </div>
  );
};

export default ProfilePage;
