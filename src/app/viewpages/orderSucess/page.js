"use client";
import React from "react";
import Link from "next/link";

const OrderSuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        ✅ Order Placed Successfully!
      </h1>
      <p className="text-gray-700 mb-6">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <Link
        href="/viewpages/my-orders"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Go to Order
      </Link>
    </div>
  );
};

export default OrderSuccessPage;
