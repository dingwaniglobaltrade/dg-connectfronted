"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createNewStaff, editStaff } from "@/app/store/Actions/staffAction";
import { toast } from "react-toastify";

const AddStaffForm = ({ initialData = {}, isEditMode = false }) => {

  const dispatch = useDispatch();

  const [addStaffFormData, setAddStaffFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    userType: "", // "subadmin" or "salesperson"
    active: "",
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      setAddStaffFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        mobile: initialData.mobile || "",
        userType: initialData.userType || "",
        active: initialData.active?.toString() || "", // boolean to string
      });
    }
  }, [initialData, isEditMode]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddStaffFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result;

      if (initialData) {
        // Only send updated fields
        const updatedFields = {};
        Object.keys(addStaffFormData).forEach((key) => {
          if (addStaffFormData[key] !== (initialData[key]?.toString() || "")) {
            updatedFields[key] = addStaffFormData[key];
          }
        });

        if (Object.keys(updatedFields).length === 0) {
          toast.info("No changes made.");
          return;
        }

        const row = initialData;

        result = await dispatch(editStaff(row, updatedFields));
        toast.success(
          `Staff Detailes updated successfully!`
        );
      } else {
        result = await dispatch(createNewStaff(addStaffFormData));
        setAddStaffFormData({
          name: "",
          email: "",
          mobile: "",
          userType: "",
          active: "",
        });
      }

      if (result?.success) {
        toast.success(
          `Staff ${initialData ? "updated" : "created"} successfully!`
        );
      }
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("An error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-1 grid-cols-1">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 text-[12px] mt-2">
          <div>
            <label className="text-texthearder font-semibold">Name</label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="text"
              name="name"
              value={addStaffFormData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-texthearder font-semibold">Email</label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="email"
              name="email"
              value={addStaffFormData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 text-[12px] mt-2">
          <div>
            <label className="text-texthearder font-semibold">
              Mobile Number
            </label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="tel"
              name="mobile"
              value={addStaffFormData.mobile}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-texthearder font-semibold">
              Assign Role
            </label>
            <select
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              name="userType"
              value={addStaffFormData.userType}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="salesperson">Salesperson</option>
              <option value="subadmin">Subadmin</option>
            </select>
          </div>
          <div>
            <label className="text-texthearder font-semibold">Status</label>
            <select
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              name="active"
              value={addStaffFormData.active}
              onChange={handleChange}
            >
              <option value="">Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-end w-full">
        <button
          type="submit"
          className="bg-primary text-[12px] text-white mt-4 px-6 py-2 mb-4 rounded"
        >
          {initialData ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AddStaffForm;
