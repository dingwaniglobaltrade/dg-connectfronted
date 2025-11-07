"use client";
import React, { useEffect, useRef, useState } from "react";
import Searchbtn from "@/app/component/useable/FormSearchbtn";
import Table from "@/app/component/useable/table";
import { createColumnHelper } from "@tanstack/react-table";
import useIsMobile from "@/app/customhooks/mobileview";
import SearchFilter from "@/app/component/useable/searchfiled"; // import search
import {
  asyncfetchproduct,
} from "@/app/store/Actions/productAction";
import { useDispatch } from "react-redux";

const columnHelper = createColumnHelper();

const InventoryManagement = () => {
  const dispatch = useDispatch();

  const [selectedRowIds, setSelectedRowIds] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(true);

  const [tableData, setTableData] = useState([]); // ✅ holds search results
  const searchRef = useRef();
  const dropdownRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(asyncfetchproduct());
        if (result && result.products) {
          setProducts(result.products);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const filterButtons = [
    { label: "All Products", count: products.length, value: "all" },
    {
      label: "Available",
      count: products.filter((item) => item.Active === "TRUE").length,
      value: "TRUE",
    },
    {
      label: "Disable",
      count: products.filter((item) => item.Active === "FALSE").length,
      value: "FALSE",
    },
  ];

  const getFilteredData = () => {
    if (activeFilter === "TRUE") {
      return products.filter((item) => item.Active === "TRUE");
    } else if (activeFilter === "FALSE") {
      return products.filter((item) => item.Active === "FALSE");
    }
    return products;
  };

  const filteredData = getFilteredData();
  const isMobile = useIsMobile();

  // ✅ handle search results
  const handleDataFetched = (result) => {
    if (result?.data) {
      setTableData(result.data);
    } else {
      setTableData([]);
    }
  };

  // ✅ final data = search result OR filter result
  const finalData =
    tableData.length > 0 ? tableData : filteredData;

  const toggleAllRows = (checked) => {
    const newSelection = {};
    finalData.forEach((row) => {
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

  const handleStock = (row) => {
    setSelectedProduct(row);
    setOpenEditModal(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const refs = Object.values(dropdownRefs.current);
      if (!refs.some((ref) => ref && ref.contains(event.target))) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const columns = [

    columnHelper.accessor("ProductName", {
      header: "Product",
      enableSorting: true,
      cell: (info) => {
        const row = info.row.original;
        const firstImage = row.media?.find((m) => m.type === "IMAGE");
        return (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() =>
              window.open(`/portalpages/allproduct/${row.id}`, "_blank")
            }
          >
            {firstImage ? (
              <img
                src={firstImage.url}
                alt="product"
                className="w-8 h-8 rounded"
              />
            ) : (
              <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                N/A
              </div>
            )}
            <span className="text-primary hover:underline">
              {row.ProductName}
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor("ProductPrice", {
      header: "Price",
      enableSorting: true,
      cell: (info) => `₹ ${info.getValue()}`,
    }),
    columnHelper.accessor("Active", {
      header: "Status",
      enableSorting: true,
    }),
    columnHelper.accessor("RetaileStock", {
      header: "Retail Stock",
      enableSorting: true,
    }),
    columnHelper.accessor("LargeCartoonStock", {
      header: "Cartoon Stock",
      enableSorting: true,
    }),
  ];

  return (
    <div className="h-[90%] w-full bg-[#f8f9fa] lg:px-1 md:px-5 px-2 pt-4 flex flex-col gap-3">
      <div className="w-full h-[96%] lg:px-6 md:px-6 px-2">
        <div className="h-full w-full bg-white flex flex-col rounded-[10px]">
          <div className="flex justify-between mt-4 px-4 items-center lg:flex-row md:flex-row flex-col">
            <div className="flex gap-3 flex-wrap">
              {filterButtons.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => {
                    setActiveFilter(btn.value);
                    setTableData([]); // reset search on filter change
                  }}
                  className={`text-[12px] font-medium whitespace-nowrap pb-1 border-b-3 transition-all duration-200 ${
                    activeFilter === btn.value
                      ? "border-b-[3px] border-primary"
                      : "border-b-[3px] border-transparent"
                  }`}
                >
                  {btn.label}
                  <span className="ml-2 lg:bg-[#F3F9FF] md:bg-[#F3F9FF] bg-transparent lg:px-1 py-1 lg:border-[1px] lg:border-[#DDE8F4] md:border-[1px] md:border-[#DDE8F4] border-transparent border-none rounded-[4px]">
                    ({btn.count})
                  </span>
                </button>
              ))}
            </div>
            <div className="lg:mt-0 md:mt-0 mt-2 flex gap-3">
              {/* ✅ Search Added */}
              <SearchFilter
                ref={searchRef}
                model="Product"
                filterOptions={[]} // can add filter options later
                onDataFetched={handleDataFetched}
              />
              {openEditModal && (
                <Searchbtn
                  btntext="Add Stock"
                  initialData={selectedProduct}
                  isEditMode={true}
                  display="flex"
                  formType="stock"
                />
              )}
            </div>
          </div>

          <div className="lg:px-4 md:px-4 px-2 h-[90%] overflow-auto scroll-smooth">
            {finalData.length === 0 ? (
              <div className="h-full flex justify-center items-center text-gray-500">
                No products found.
              </div>
            ) : (
              <Table data={finalData} columns={columns} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;
