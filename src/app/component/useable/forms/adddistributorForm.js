"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncfetchroute } from "@/app/store/Actions/routeAction";
import { fetchAllSalespersons } from "@/app/store/Actions/salespersonAction";
import {
  createDistributor,
  editDistributordetailes,
} from "@/app/store/Actions/distributorAction";
import { toast } from "react-toastify";

const DistributorForm = ({
  initialData = null,
  isEditMode = false,
  onSubmit,
}) => {
  const dispatch = useDispatch();

  const [distributorFormData, setDistributorFormData] = useState({
    firmName: "",
    profileImage: "",
    name: "",
    email: "",
    mobile: "",
    gstn: "",
    address: [
      {
        complectAddress: "",
        pincode: "",
        city: "",
        stateName: "",
      },
    ],
    routeID: [],
    assignedSalespersons: [],
  });

  const [routes, setRoutes] = useState([]);
  const [salespersons, setSalespersons] = useState([]);
  const [profilePreview, setProfilePreview] = useState("");

  // Load profile preview for edit mode
  useEffect(() => {
    if (initialData?.profileImage) {
      setProfilePreview(initialData.profileImage);
    }
  }, [initialData]);

  // Fetch routes
  useEffect(() => {
    dispatch(asyncfetchroute()).then((res) => {
      if (res?.routes) setRoutes(res.routes);
    });
  }, [dispatch]);

  // Fetch salespersons
  useEffect(() => {
    dispatch(fetchAllSalespersons()).then((res) => {
      if (res?.salesperson) setSalespersons(res.salesperson);
    });
  }, [dispatch]);

  // Pre-fill form in edit mode
  useEffect(() => {
    if (!initialData) return;

    setDistributorFormData({
      ...distributorFormData,
      ...initialData,
      address:
        initialData.address?.length > 0
          ? initialData.address
          : [
              {
                complectAddress: "",
                pincode: "",
                city: "",
                stateName: "",
              },
            ],
      routeID: initialData.routeID || [],
      assignedSalespersons: initialData.assignedSalespersons || [],
    });
  }, [initialData]);

  const handleChange = (e) => {
    setDistributorFormData({
      ...distributorFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressChange = (field, value) => {
    const updated = [...distributorFormData.address];
    updated[0][field] = value;

    setDistributorFormData({
      ...distributorFormData,
      address: updated,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(distributorFormData).forEach((key) => {
      const value = distributorFormData[key];

      if (key === "profileImage" && value instanceof File) {
        formData.append("profileImage", value);
      } else if (Array.isArray(value) || typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    let result;
    if (!initialData) {
      result = await dispatch(createDistributor(formData));
    } else {
      result = await dispatch(
        editDistributordetailes(initialData.id, formData)
      );
    }

    if (result?.success) {
      toast.success(
        `Distributor ${initialData ? "Updated" : "Created"} Successfully`
      );
      if (onSubmit) onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-1 grid-cols-1">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-4 text-[12px] mt-2">
          {/* Shop Name */}
          <div>
            <label className="font-semibold">Firm Name</label>
            <input
              type="text"
              name="firmName"
              value={distributorFormData.firmName}
              onChange={handleChange}
              className="w-full py-1.5 rounded px-2 mt-1 border"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="font-semibold">Profile Image</label>

            {profilePreview && (
              <img
                src={profilePreview}
                className="w-20 h-20 rounded object-cover mb-2"
              />
            )}

            <input
              type="file"
              name="profileImage"
              onChange={(e) => {
                const file = e.target.files[0];
                setDistributorFormData({
                  ...distributorFormData,
                  profileImage: file,
                });
                if (file) setProfilePreview(URL.createObjectURL(file));
              }}
              className="w-full py-1 rounded px-2 mt-1 border"
            />
          </div>

          {/* Contact Person */}
          <div>
            <label className="font-semibold">Concern Person Name</label>
            <input
              type="text"
              name="name"
              value={distributorFormData.name}
              onChange={handleChange}
              className="w-full py-1.5 rounded px-2 mt-1 border"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={distributorFormData.email}
              onChange={handleChange}
              className="w-full py-1.5 rounded px-2 mt-1 border"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="font-semibold">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={distributorFormData.mobile}
              onChange={handleChange}
              className="w-full py-1.5 rounded px-2 mt-1 border"
            />
          </div>

          {/* GSTN */}
          <div>
            <label className="font-semibold">GSTN</label>
            <input
              type="text"
              name="gstn"
              value={distributorFormData.gstn}
              onChange={handleChange}
              className="w-full py-1.5 rounded px-2 mt-1 border"
            />
          </div>

          {/* Address */}
          <div>
            <label className="font-semibold">Firm Address</label>
            <input
              type="text"
              value={distributorFormData.address[0].complectAddress}
              onChange={(e) =>
                handleAddressChange("complectAddress", e.target.value)
              }
              className="w-full py-1.5 rounded px-2 mt-1 border"
            />
          </div>

          <div>
            <label className="font-semibold">Pincode</label>
            <input
              type="number"
              value={distributorFormData.address[0].pincode}
              onChange={(e) => handleAddressChange("pincode", e.target.value)}
              className="w-full py-1.5 rounded px-2 mt-1 border"
            />
          </div>

          <div>
            <label className="font-semibold">City</label>
            <input
              type="text"
              value={distributorFormData.address[0].city}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              className="w-full py-1.5 rounded px-2 mt-1 border"
            />
          </div>

          <div>
            <label className="font-semibold">State Name</label>
            <input
              type="text"
              value={distributorFormData.address[0].stateName}
              onChange={(e) => handleAddressChange("stateName", e.target.value)}
              className="w-full py-1.5 rounded px-2 mt-1 border"
            />
          </div>

          {/* Salespersons */}
          <div>
            <label className="font-semibold">Assign Salespersons</label>
            <select
              multiple
              value={distributorFormData.assignedSalespersons}
              onChange={(e) => {
                const selected = Array.from(
                  e.target.selectedOptions,
                  (o) => o.value
                );
                setDistributorFormData({
                  ...distributorFormData,
                  assignedSalespersons: selected,
                });
              }}
              className="w-full py-1.5 rounded px-2 mt-1 border h-28"
            >
              {salespersons.map((sp) => (
                <option key={sp.id} value={sp.id}>
                  {sp.name}
                </option>
              ))}
            </select>
          </div>

          {/* Routes */}
          <div>
            <label className="font-semibold">Select Routes</label>
            <select
              multiple
              value={distributorFormData.routeID}
              onChange={(e) => {
                const selected = Array.from(
                  e.target.selectedOptions,
                  (o) => o.value
                );
                setDistributorFormData({
                  ...distributorFormData,
                  routeID: selected,
                });
              }}
              className="w-full py-1.5 rounded px-2 mt-1 border h-28"
            >
              {routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.routeName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end w-full">
        <button
          type="submit"
          className="bg-primary text-[12px] text-white mt-4 px-6 py-2 mb-4 rounded"
        >
          {initialData ? "Update Distributor" : "Create Distributor"}
        </button>
      </div>
    </form>
  );
};

export default DistributorForm;
