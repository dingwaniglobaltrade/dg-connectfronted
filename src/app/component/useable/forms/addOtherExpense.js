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
    OtherExpense: "",
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
      let result;
      const updatedFields = {};
      console.log("Form Data:", addExpenseData);

      if (!initialData) {
        // Create Mode
        Object.keys(addExpenseData).forEach((key) => {
          updatedFields[key] = addExpenseData[key];
        });

        console.log("Creating Expense with Data:", updatedFields);
        result = await dispatch(CreateExpense(updatedFields));
      } else {
        // Edit Mode - Only send changed fields
        Object.keys(addExpenseData).forEach((key) => {
          if (addExpenseData[key] !== initialData[key]) {
            updatedFields[key] = addExpenseData[key];
          }
        });

        if (Object.keys(updatedFields).length === 0) {
          toast.info("No changes detected.");
          return;
        }

        console.log("Updating Expense with Changes:", updatedFields);
        result = await dispatch(
          updatetheExpenseStatus(initialData.id, updatedFields)
        );
      }

      if (result?.success) {
        toast.success(
          `Expense ${initialData ? "updated" : "created"} successfully!`
        );

        if (!initialData) {
          setAddExpenseData({
            Date: "",
            OtherExpense: "",
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
            <label className="text-texthearder font-semibold">Date</label>
            <input
              name="Date"
              type="date"
              required
              value={addExpenseData.Date || ""}
              onChange={handleChange}
              className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
            />
          </div>

          {/* Other Expenses */}
          <div>
            <label className="text-texthearder font-semibold">
              Other Expenses
            </label>
            <input
              type="text"
              name="OtherExpense"
              value={addExpenseData.OtherExpense || ""}
              onChange={handleChange}
              className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
            />
          </div>

          {/* Bill Image */}
          <div>
            <label className="text-texthearder font-semibold">Bill Image</label>
            <input
              type="file"
              name="Bill Image"
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

          {/* Payment Proof Image */}
          <div>
            <label className="text-texthearder font-semibold">Payment Proof</label>
            <input
              type="file"
              name="Payment Proof"
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
