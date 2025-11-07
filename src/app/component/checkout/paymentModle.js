"use client";
import React from "react";

const PaymentModal = ({ isOpen, onClose, totalAmount, onCOD, onOnlinePay }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Choose Payment Method</h2>
        <p className="mb-4 text-gray-700">
          Total Amount: <strong>₹ {totalAmount}</strong>
        </p>

        <div className="flex flex-col gap-3">
          <button
            className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
            onClick={onCOD}
          >
            Cash on Delivery
          </button>

          <button
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={onOnlinePay}
          >
            Pay Online
          </button>
            <button
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={onOnlinePay}
          >
            UPI
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
