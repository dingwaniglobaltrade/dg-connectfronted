"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  asyncfetchExpenses,
  CreateExpense,
  updatetheExpenseStatus,
} from "@/app/store/Actions/expenseAction";
import { toast } from "react-toastify";

const OtherExpenseForm = ({ initialData = {}, isEditMode = false }) => {
  const dispatch = useDispatch();

  const [addExpenseData, setAddExpenseData] = useState({
    Date: "",
    othersExpense: "",
    BillImage: "",
    Paymentproof: "",
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

      // Append text fields
      formData.append("Date", addExpenseData.Date);
      formData.append("othersExpense", addExpenseData.othersExpense);

      // Append file fields (Multer expects field names to match)
      if (addExpenseData.BillImage) {
        formData.append("BillImage", addExpenseData.BillImage);
      }
      if (addExpenseData.Paymentproof) {
        formData.append("Paymentproof", addExpenseData.Paymentproof);
      }

      let result;

      if (!initialData || Object.keys(initialData).length === 0) {
        // Create mode
        console.log("Creating Other Expense");
        result = await dispatch(CreateExpense(formData));
      } else {
        // Edit mode — only append changed fields
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

        console.log("Updating Other Expense");
        result = await dispatch(
          updatetheExpenseStatus(initialData.id, formData)
        );
      }

      if (result?.success) {
        toast.success(
          `Expense ${initialData ? "updated" : "created"} successfully!`
        );

        if (!initialData) {
          // Reset the form
          setAddExpenseData({
            Date: "",
            othersExpense: "",
            BillImage: "",
            Paymentproof: "",
          });
        }

        dispatch(asyncfetchExpenses());
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
            <label className="text-texthearder font-semibold flex">Date</label>
            <input
              name="Date"
              type="date"
              required
              value={addExpenseData.Date || ""}
              onChange={handleChange}
              className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
            />
          </div>

          {/* Other Expense */}
          <div>
            <label className="text-texthearder font-semibold flex">
              Other Expense
            </label>
            <input
              type="text"
              name="othersExpense"
              value={addExpenseData.othersExpense || ""}
              onChange={handleChange}
              className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
            />
          </div>

          {/* Bill Image */}
          <div>
            <label className="text-texthearder font-semibold flex">
              Bill Image
            </label>
            <input
              type="file"
              name="BillImage"
              required
              onChange={(e) =>
                setAddExpenseData((prev) => ({
                  ...prev,
                  BillImage: e.target.files[0],
                }))
              }
              className="w-full py-1 rounded px-2 mt-1 text-black border border-grey-200"
            />
          </div>

          {/* Payment Proof */}
          <div>
            <label className="text-texthearder font-semibold flex">
              Payment Proof
            </label>
            <input
              type="file"
              name="Paymentproof"
              onChange={(e) =>
                setAddExpenseData((prev) => ({
                  ...prev,
                  Paymentproof: e.target.files[0],
                }))
              }
              className="w-full py-1 rounded px-2 mt-1 text-black border border-grey-200"
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

export default OtherExpenseForm;
