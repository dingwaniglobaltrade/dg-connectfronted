"use client";
import React from "react";
import Link from "next/link";

const OrderSuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
      <h1 className="text-3xl font-bold text-red-700 mb-4">
        ❌ Order Failed!
      </h1>
      <p className="text-gray-700 mb-6">
        Your order is failed, please try again later. 
      </p>
      <Link
        href="/viewpages/productpages"
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default OrderSuccessPage;
