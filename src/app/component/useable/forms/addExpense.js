"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  asyncfetchExpenses,
  CreateExpense,
  updatetheExpenseStatus,
} from "@/app/store/Actions/expenseAction";
import { toast } from "react-toastify";

const AddExpenseForm = ({ initialData = {}, isEditMode = false, onSubmit }) => {
  const dispatch = useDispatch();

  const [addExpenseData, setAddExpenseData] = useState({
    Date: "",
    StartImage: "",
    EndImage: "",
    TotalkmTravel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddExpenseData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (initialData) {
      const sanitized = Object.fromEntries(
        Object.entries(initialData).map(([key, val]) => [key, val ?? ""])
      );
      setAddExpenseData((prev) => ({ ...prev, ...sanitized }));
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append basic fields
      formData.append("Date", addExpenseData.Date);
      formData.append("TotalkmTravel", addExpenseData.TotalkmTravel);
      if (addExpenseData.othersExpense) {
        formData.append("othersExpense", addExpenseData.othersExpense);
      }

      // Append file fields (must match Multer field names)
      if (addExpenseData.StartImage) {
        formData.append("StartImage", addExpenseData.StartImage);
      }
      if (addExpenseData.EndImage) {
        formData.append("EndImage", addExpenseData.EndImage);
      }
      if (addExpenseData.BillImage) {
        formData.append("BillImage", addExpenseData.BillImage);
      }
      if (addExpenseData.Paymentproof) {
        formData.append("Paymentproof", addExpenseData.Paymentproof);
      }

      let result;

      if (!initialData || Object.keys(initialData).length === 0) {
        // Create Mode
        console.log("Creating Expense with FormData:");
        result = await dispatch(CreateExpense(formData));
      } else {
        // Edit Mode - only append changed fields
        let hasChanges = false;

        Object.keys(addExpenseData).forEach((key) => {
          if (
            addExpenseData[key] !== initialData[key] &&
            addExpenseData[key] != null
          ) {
            hasChanges = true;
            formData.append(key, addExpenseData[key]);
          }
        });

        if (!hasChanges) {
          toast.info("No changes detected.");
          return;
        }

        console.log("Updating Expense with FormData:");
        result = await dispatch(
          updatetheExpenseStatus(initialData.id, formData)
        );
      }

      if (result?.success) {
        toast.success(
          `Expense ${initialData ? "updated" : "created"} successfully!`
        );
        if (onSubmit) onSubmit();
        if (!initialData) {
          // Reset form
          setAddExpenseData({
            Date: "",
            StartImage: "",
            EndImage: "",
            BillImage: "",
            Paymentproof: "",
            TotalkmTravel: "",
            othersExpense: "",
          });
        }
      } else {
        toast.warn(result?.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Expense Submit Error:", err);
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-1 grid-cols-1">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-4 text-[12px] mt-2">
          {/* Date */}
          <div>
            <label className="text-texthearder font-semibold flex">Date </label>
            <input
              name="Date"
              type="date"
              value={addExpenseData.Date || ""}
              required
              onChange={handleChange}
              className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
            />
          </div>

          {/* Start  Image */}
          <div>
            <label className="text-texthearder font-semibold">
              Start Image
            </label>
            <input
              type="file"
              name="StartImage"
              required
              onChange={(e) =>
                setAddExpenseData((prev) => ({
                  ...prev,
                  StartImage: e.target.files[0],
                }))
              }
              className="w-full py-1 rounded px-2 mt-1 text-black border border-grey-200"
            />
          </div>

          {/* End  Image */}
          <div>
            <label className="text-texthearder font-semibold">End Image</label>
            <input
              type="file"
              name="EndImage"
              required
              onChange={(e) =>
                setAddExpenseData((prev) => ({
                  ...prev,
                  EndImage: e.target.files[0],
                }))
              }
              className="w-full py-1 rounded px-2 mt-1 text-black border border-grey-200"
            />
          </div>

          <div>
            <label className="text-texthearder font-semibold">
              Total Traval (KM)
            </label>
            <input
              name="TotalkmTravel"
              type="text"
              value={addExpenseData.TotalkmTravel || ""}
              onChange={handleChange}
              className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end w-full">
        <button
          type="submit"
          className="bg-primary text-[12px] text-white mt-4 px-6 py-2 mb-4 rounded"
        >
          {initialData ? "Update Expense" : "Create Expense"}
        </button>
      </div>
    </form>
  );
};

export default AddExpenseForm;
