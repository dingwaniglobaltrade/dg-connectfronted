"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Table from "@/app/component/useable/table";
import useIsMobile from "@/app/customhooks/mobileview";
import { createColumnHelper } from "@tanstack/react-table";

import { asyncfetchDistributorWiseRoutes } from "@/app/store/Actions/routeAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { deleteProduct } from "@/app/store/Actions/productAction"; // <-- Adjust path if needed
import { useMemo } from "react";
const columnHelper = createColumnHelper();

const Main = () => {
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [routeData, setRoutedata] = useState([]);
  const dropdownRefs = useRef({});

  const toggleAllRows = (checked) => {
    const newSelection = {};
    routeData.forEach((row) => {
      newSelection[row.id] = checked;
    });
    setSelectedRowIds(newSelection);
  };

  const toggleRow = (id, checked) => {
    setSelectedRowIds((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const loginState = useSelector((state) => state.login);

  const id = loginState?.admin?.id;

  useEffect(() => {
    if (!id) return; // prevent running without id
    const fetchData = async () => {
      try {
        const result = await dispatch(asyncfetchDistributorWiseRoutes());
        if (result) {
          setRoutedata(result.routes); 
        }
      } catch (error) {
        console.error("Error fetching Route data:", error);
      }
    };
    fetchData();
  }, [dispatch, id]);

  const columns = [
    columnHelper.accessor("routeName", {
      header: "Route",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("retailerCount", {
      header: "Retailers",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("salespersons", {
      header: "Assigned Salesperson",
      cell: (info) => {
        const salespersons = info.getValue();
        if (!salespersons || salespersons.length === 0) {
          return "—"; // or "Unassigned"
        }
        return salespersons.map((sp) => sp.name).join(", ");
      },
    }),
  ];

  return (
    <div className="h-[90%] w-full bg-[#f8f9fa] lg:px-1 md:px-5 px-2 pt-4 flex flex-col gap-3">
      <div className="w-full h-[96%] lg:px-6 md:px-6 px-2">
        <div className="h-full w-full bg-white flex flex-col rounded-[10px]">
          <div className="lg:px-4 md:px-4 px-2 h-[90%] overflow-auto scroll-smoot mt-10">
            {routeData.length > 0 ? (
              <Table columns={columns} data={routeData} />
            ) : (
              <p className="text-gray-500 text-center">
                No Distributor Routes data found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
