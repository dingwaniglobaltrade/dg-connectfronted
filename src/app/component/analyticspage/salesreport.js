"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createSalesReport,
  createAttendanceReport,
  createProductReport,
  createDistributorReport,
  createRetailerReport,
  createOrderItemsReport,
  createExpenseReport,
} from "@/app/store/Actions/reportAction";
import { FaFileCsv } from "react-icons/fa6";
import Image from "next/image";

const ReportDownloadCard = ({ title, reportType, imageSrc }) => {
  const [showModal, setShowModal] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const dispatch = useDispatch();

  const reportActions = {
    sales: createSalesReport,
    product: createProductReport,
    attendance: createAttendanceReport,
    distributor: createDistributorReport,
    retailer: createRetailerReport,
    orderItems: createOrderItemsReport,
    expense: createExpenseReport,
  };

  const downloadReport = () => {
    const selectedAction = reportActions[reportType];

    if (!selectedAction) {
      console.error(`Invalid report type: ${reportType}`);
      return;
    }

    dispatch(selectedAction(start, end));
    setShowModal(false);
  };

  return (
    <>
      {/* Report Card */}
      <div
        className="relative h-56 w-56 text-white rounded-[8px] mt-10 ml-10 flex flex-col gap-3 justify-center items-center cursor-pointer transition"
        onClick={() => setShowModal(true)}
      >
        {/* Background Image */}
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="absolute inset-0 z-0 object-cover rounded-[8px]"
          sizes="100%"
        />

        {/* Foreground */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <FaFileCsv className="text-[35px]" />
          <h1 className="text-[25px] font-medium px-3 py-2">{title}</h1>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h2 className="text-[18px] font-semibold text-primary mb-4">
              {title} Date Range
            </h2>

            <label className="block font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              className="border p-1.5 w-full rounded mb-3"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />

            <label className="block font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              className="border p-1.5 w-full rounded mb-5"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="bg-primary text-white px-4 py-2 rounded"
                onClick={downloadReport}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportDownloadCard;
