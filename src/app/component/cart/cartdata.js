"use client"
import React from "react";
import Table from "./carttable";



const cardata = () => {


  return (
    <div className="h-[90%] w-full bg-[#f8f9fa] lg:px-5 md:px-5 px-2 py-4">
      <div className="lg:h-[600px] md:h-[600px] h-[100%] lg:px-10 md:px-6 px-2 py-4 bg-white rounded-md overflow-y-auto">
        <h1 className="font-semibold text-[16px]">Product / Cart</h1>
        <Table />
      </div>
    </div>
  );
};

export default cardata;
