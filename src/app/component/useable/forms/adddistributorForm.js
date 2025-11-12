"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncfetchroute } from "@/app/store/Actions/routeAction";
import { fetchAllSalespersons } from "@/app/store/Actions/salespersonAction";
import {
  fetchAllDistributor,
  createDistributor,
  editDistributordetailes,
} from "@/app/store/Actions/distributorAction";
import { toast } from "react-toastify";

const RetailerForm = ({ initialData = {}, isEditMode = false }) => {
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
  const [profilePreview, setProfilePreview] = useState(""); // for image preview

  useEffect(() => {
    if (initialData?.profileImage) {
      setProfilePreview(initialData.profileImage);
    }
  }, [initialData]);

  // Fetch routes
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const result = await dispatch(asyncfetchroute());
        console.log({ result });

        if (result?.routes) {
          setRoutes(result.routes);
        }
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
    fetchRoutes();
  }, [dispatch]);

  //fetch all salespersons
  useEffect(() => {
    const fetchSalespersons = async () => {
      try {
        const result = await dispatch(fetchAllSalespersons());
        if (result?.salesperson) {
          setSalespersons(result.salesperson);
        }
      } catch (error) {
        console.log("Error fetching Salepsersons", error);
      }
    };
    fetchSalespersons();
  }, [dispatch]);

  // Set form data if editing
  useEffect(() => {
    if (initialData) {
      const sanitized = {
        ...initialData,
        address:
          initialData.address && initialData.address.length > 0
            ? initialData.address
            : [{ complectAddress: "", pincode: "", city: "", stateName: "" }],
      };
      setDistributorFormData((prev) => ({ ...prev, ...sanitized }));
    }
  }, [initialData]);

  console.log({ initialData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDistributorFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (field, value) => {
    const updatedAddress = [...(distributorFormData.address || [{}])];
    updatedAddress[0] = {
      ...updatedAddress[0],
      [field]: value,
    };
    setDistributorFormData({
      ...distributorFormData,
      address: updatedAddress,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      Object.keys(distributorFormData).forEach((key) => {
        const value = distributorFormData[key];

        if (key === "profileImage" && value instanceof File) {
          // Send file as file
          formData.append("profileImage", value);
        } else if (Array.isArray(value) || typeof value === "object") {
          // Send objects/arrays as JSON string
          formData.append(key, JSON.stringify(value));
        } else if (value !== null && value !== undefined) {
          // Send normal fields
          formData.append(key, value);
        }
      });

      let result;
      if (!initialData) {
        result = await dispatch(createDistributor(formData));
      } else {
        result = await dispatch(
          editDistributordetailes(distributorFormData.id, formData)
        );
      }

      if (result?.success) {
        toast.success(
          `Distributor ${initialData ? "updated" : "created"} successfully!`
        );
      }
    } catch (err) {
      console.error("Distributor Submit Error:", err);
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-1 grid-cols-1">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-4 text-[12px] mt-2">
          {/* Shop Name */}
          <div>
            <label className="text-texthearder font-semibold">Firm Name</label>
            <input
              type="text"
              name="firmName"
              value={distributorFormData.firmName || ""}
              onChange={handleChange}
              className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
            />
          </div>

          {/* Shop Image */}
          <div>
            <label className="text-texthearder font-semibold">
              Profile Image
            </label>
            {profilePreview && (
              <img
                src={profilePreview}
                alt="Profile"
                className="w-20 h-20 mb-2 object-cover rounded"
              />
            )}
            <input
              type="file"
              name="profileImage"
              onChange={(e) => {
                const file = e.target.files[0];
                setDistributorFormData((prev) => ({
                  ...prev,
                  profileImage: file,
                }));
                if (file) {
                  setProfilePreview(URL.createObjectURL(file));
                }
              }}
              className="w-full py-1 rounded px-2 mt-1 text-black border border-grey-200"
            />
          </div>

          {/* Name */}
          <div>
            <label className="text-texthearder font-semibold">
              Concern Person Name
            </label>
            <input
              type="text"
              name="name"
              value={distributorFormData.name || ""}
              onChange={handleChange}
              className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-texthearder font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={distributorFormData.email || ""}
              onChange={handleChange}
              className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="text-texthearder font-semibold">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={distributorFormData.mobile || ""}
              onChange={handleChange}
              className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
            />
          </div>

          {/* GSTN */}
          <div>
            <label className="text-texthearder font-semibold">GSTN</label>
            <input
              type="text"
              name="gstn"
              value={distributorFormData.gstn || ""}
              onChange={handleChange}
              className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-texthearder font-semibold">
              Firm Address
            </label>
            <input
              type="text"
              name="complectAddress"
              value={distributorFormData.address[0].complectAddress || ""}
              onChange={(e) =>
                handleAddressChange("complectAddress", e.target.value)
              }
              className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
            />
          </div>

          <div>
            <label className="text-texthearder font-semibold">Pincode</label>
            <input
              type="Number"
              name="pincode"
              value={distributorFormData.address[0].pincode || ""}
              onChange={(e) => handleAddressChange("pincode", e.target.value)}
              className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
            />
          </div>

          <div>
            <label className="text-texthearder font-semibold">City</label>
            <input
              type="text"
              name="city"
              value={distributorFormData.address[0].city || ""}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
            />
          </div>

          <div>
            <label className="text-texthearder font-semibold">State Name</label>
            <input
              type="text"
              name="stateName"
              value={distributorFormData.address?.[0]?.stateName || ""}
              onChange={(e) => handleAddressChange("stateName", e.target.value)}
              className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
            />
          </div>
          {/* Salesperson */}
          <div>
            <label className="text-texthearder font-semibold">
              Assign Salespersons
            </label>
            <select
              multiple
              name="assignedSalespersons"
              value={distributorFormData.assignedSalespersons}
              onChange={(e) => {
                const selected = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setDistributorFormData((prev) => ({
                  ...prev,
                  assignedSalespersons: selected,
                }));
              }}
              className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200 h-28"
            >
              {salespersons.map((salesperson) => (
                <option key={salesperson.id} value={salesperson.id}>
                  {salesperson.name}
                </option>
              ))}
            </select>
          </div>

          {/* Route */}
          <div>
            <label className="text-texthearder font-semibold">
              Select Routes
            </label>
            <select
              multiple
              name="routeID"
              value={distributorFormData.routeID}
              onChange={(e) => {
                const selected = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setDistributorFormData((prev) => ({
                  ...prev,
                  routeID: selected,
                }));
              }}
              className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200 h-28"
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

export default RetailerForm;
