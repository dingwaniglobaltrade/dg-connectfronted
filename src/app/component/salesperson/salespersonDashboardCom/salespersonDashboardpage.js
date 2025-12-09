"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Timer from "@/app/component/salesperson/salespersonDashboardCom/timer";
import DashboardHalf from "@/app/component/Admindashboard/dashboardhalf";
import Table from "@/app/component/Admindashboard/table";
import useIsMobile from "@/app/customhooks/mobileview";
import { asyncfetchretailer } from "@/app/store/Actions/retailerAction";
import { asyncfetchOrders } from "@/app/store/Actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const SalespersonDashboardPage = () => {
  const [totalOrders, setTotalOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 5;
  const [retailersData, setRetailersData] = useState([]);

  // Row selection state
  const [selectedRowIds, setSelectedRowIds] = useState({});

  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const loginState = useSelector((state) => state.login);
  const admin = loginState?.admin;

  const distributor = admin?.Distributor;
  const route = admin?.salespersonRoute;
  let parsedAddressArray = [];

  // Only parse if address exists and is a string
  if (distributor?.address && typeof distributor.address === "string") {
    try {
      const parsed = JSON.parse(distributor.address);
      // Ensure it’s an array
      parsedAddressArray = Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to parse distributor.address:", error);
    }
  }

const addressObj =
  Array.isArray(distributor?.address) && distributor.address.length > 0
    ? distributor.address[0]
    : null;

const fullAddress = addressObj
  ? `${addressObj.complectAddress || ""}, ${addressObj.city || ""}, ${
      addressObj.stateName || ""
    } - ${addressObj.pincode || ""}`
  : "N/A";

  // ---------------- FETCH ORDERS ----------------
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await dispatch(asyncfetchOrders({ page: 1, limit: 10 }));
        if (result?.totalOrders) {
          setTotalOrders(result.totalOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [dispatch]);

  // ---------------- FETCH RETAILERS ----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(
          asyncfetchretailer({ page: currentPage, limit: pageSize })
        );
        // console.log({ resultss: result });

        if (result) {
          setRetailersData(result.retailers || []);
          setTotalPages(result.totalPages || 1);
          setTotalCount(result.count || 0);
        }
      } catch (error) {
        console.error("Error fetching retailer data:", error);
      }
    };

    fetchData();
  }, [dispatch, currentPage, pageSize]);

  // ---------------- TABLE COLUMNS ----------------
  const columns = [
    columnHelper.accessor("shopName", {
      header: "Shop Name",
      cell: (info) => {
        const row = info.row.original;
        return (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() =>
              window.open(`/portalpages/detailes/retailer/${row.id}`, "_blank")
            }
          >
            {row.shopImage ? (
              <img src={row.shopImage} alt="Shop" className="w-8 h-8 rounded" />
            ) : (
              <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                N/A
              </div>
            )}
            <span className="text-primary hover:underline">{row.shopName}</span>
          </div>
        );
      },
    }),
    columnHelper.accessor("mobile", { header: "Mobile" }),
    columnHelper.accessor("gstn", { header: "GSTN" }),
    columnHelper.accessor("name", { header: "Concern Person" }),
    columnHelper.accessor("address", { header: "Address" }),
    columnHelper.display({
      id: "livelocation",
      header: "Live Location",
      cell: ({ row }) => {
        const { latitude, longitude } = row.original;
        if (!latitude || !longitude) {
          return <span className="text-gray-400">N/A</span>;
        }
        return (
          <a
            href={`https://www.google.com/maps?q=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View on Map
          </a>
        );
      },
    }),
  ];

  return (
    <div className="bg-[#f8f9fa] h-auto overflow-auto py-2 px-4 mt-2">
      <div className="flex flex-col gap-2">
        {/* Distributor Info Card */}
        <div className="w-full h-auto px-5 py-4 bg-white flex flex-col sm:flex-row items-center sm:items-start rounded-[10px] gap-4 shadow">
          {/* Avatar */}
          <div className="w-[70px] h-[70px] rounded-full flex-shrink-0">
            <img
              className="h-full w-full rounded-full object-cover"
              src={distributor?.profileImage}
              alt={distributor?.firmName || "N/A"}
              width={70}
              height={70}
            />
          </div>

          {/* Distributor Details */}
          <div className="w-full text-[12px] md:text-[14px] font-semibold flex flex-row gap-3 mt-2">
            {/* Row 1 */}
            <div className="flex flex-col md:flex-row md:justify-between gap-2 break-words">
              <h1>
                Assigned Distributor Name:{" "}
                <span className="font-normal">
                  {distributor?.firmName || "N/A"}
                </span>
              </h1>
              <h1>
                Distributor Contact Number:{" "}
                <span className="font-normal">
                  {distributor?.mobile || "N/A"}
                </span>
              </h1>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row md:justify-between gap-2 break-words">
              <h1>
                Distributor Address:{" "}
                <span className="font-normal">{fullAddress}</span>
              </h1>
              <h1>
                Assigned Route:{" "}
                <span className="font-normal">{route?.routeName || "N/A"}</span>
              </h1>
            </div>
          </div>
        </div>

        <div className="w-full flex lg:flex-row md:flex-row flex-col gap-3 justify-center lg:h-[280px] md:h-[280px] h-full">
          <div className="lg:w-[48%] md:w-[60%] w-full py-2">
            <Timer />
          </div>
          <DashboardHalf link={"/portalpages/orders"} lable={"Order Status"} />
        </div>

        <div className="w-full mt-4">
          {retailersData.length === 0 ? (
            <div className="h-48 flex justify-center items-center text-gray-500 bg-white rounded shadow">
              No retailers found.
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-[16px] shadow">
              <Table
                columns={columns}
                data={retailersData}
                pageIndex={currentPage - 1}
                pageSize={pageSize}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page + 1)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalespersonDashboardPage;
