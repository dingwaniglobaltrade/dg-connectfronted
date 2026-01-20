"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Searchbtn from "@/app/component/useable/FormSearchbtn";
import Table from "@/app/component/useable/table";
import DropdownMenu from "../useable/dropdown1";
import Action from "@/icons/attendance/action.svg";
import { createColumnHelper } from "@tanstack/react-table";
import useIsMobile from "@/app/customhooks/mobileview";
import SearchFilter from "@/app/component/useable/searchfiled";
import { useRouter } from "next/navigation";
import {
  asyncfetchproduct,
  deleteProduct,
  editProductdetailes,
} from "@/app/store/Actions/productAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import S3Image from "../useable/S3Image";

const columnHelper = createColumnHelper();

const ProductData = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedRowIds, setSelectedRowIds] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(true);
  const [tableData, setTableData] = useState([]);
  const dropdownRefs = useRef({});
  const searchRef = useRef();

  const refreshProducts = async () => {
    try {
      const result = await dispatch(asyncfetchproduct());
      if (result && result.products) {
        setProducts(result.products);
      }
      console.log("Refreshed product data:", result?.products);
    } catch (error) {
      console.error("Error refreshing product data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(asyncfetchproduct());
        if (result && result.products) {
          setProducts(result.products);
        }
        console.log("Fetched product data:");
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

  const toggleAllRows = (checked) => {
    const newSelection = {};
    filteredData.forEach((row) => {
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

  const handleEdit = (row) => {
    console.log("Edit row:");
    setSelectedProduct(row);
    setOpenEditModal(true);
  };

  const handleEnable = async (row) => {
    try {
      await dispatch(editProductdetailes(row.id, { Active: "TRUE" }));
      toast.success("Product status is updated.");

      // Update local state instantly
      setProducts((prev) =>
        prev.map((exp) =>
          exp.id === row.id ? { ...exp, Active: "TRUE" } : exp,
        ),
      );
    } catch (err) {
      toast.error("Failed to update order status.");
    }
  };

  const handleDisable = async (row) => {
    try {
      await dispatch(editProductdetailes(row.id, { Active: "FALSE" }));
      toast.success("Product status is updated.");

      // Update local state instantly
      setProducts((prev) =>
        prev.map((exp) =>
          exp.id === row.id ? { ...exp, Active: "FALSE" } : exp,
        ),
      );
    } catch (err) {
      toast.error("Failed to update order status.");
    }
  };

  const handledelete = async (row) => {
    try {
      const result = await dispatch(deleteProduct(row.id));

      if (result?.success) {
        // Remove deleted product from local state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== row.id),
        );
        await refreshProducts();
        console.log("Product deleted successfully:");
      } else {
        console.error("Failed to delete product:", result?.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filters = [
    {
      key: "PaymentStatus",
      label: "Payment Status",
      options: [
        { value: "paid", label: "Paid" },
        { value: "pending", label: "Pending" },
        { value: "failed", label: "Failed" },
      ],
    },
  ];

  // ---------- HANDLE SEARCHFILTER RESULT ----------
  const handleDataFetched = (result) => {
    if (result?.data) {
      setTableData(result.data);
    } else {
      setTableData([]); // fallback
    }
  };

  const finalData =
    tableData.length > 0
      ? tableData // from search API
      : filteredData;

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

        // Find first media of type IMAGE
        const firstImage = row.media?.find((m) => m.type === "IMAGE");
        const imageUrl = firstImage
          ? firstImage.fileName || firstImage.url
          : null;

        return (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() =>
              window.open(`/portalpages/allproduct/${row.id}`, "_blank")
            }
          >
            {imageUrl ? (
              <div className="w-8 h-8 relative">
                <S3Image
                  s3Key={imageUrl}
                  alt="product"
                  className="object-cover rounded"
                />
              </div>
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
      header: "MRP",
      enableSorting: true,
      cell: (info) => `₹ ${info.getValue()}`,
    }),
    columnHelper.accessor("productCode", {
      header: "Product Code",
      enableSorting: true,
    }),
    columnHelper.accessor("Active", {
      header: "Status",
      enableSorting: true,
    }),
    columnHelper.accessor("RetailerPrice", {
      header: "Retail Price",
      enableSorting: true,
      cell: (info) => `₹ ${info.getValue()}`,
    }),
    columnHelper.accessor("LargeCartoonPrice", {
      header: "Carton Price",
      enableSorting: true,
      cell: (info) => `₹ ${info.getValue()}`,
    }),
    columnHelper.accessor("NetQuantity", {
      header: "Net Quantity(gm)",
      enableSorting: true,
    }),
    columnHelper.accessor("icon", {
      header: "Action",
      cell: ({ row }) => {
        const rowId = row.original.id;
        const isOpen = openDropdownId === rowId;
        const status = row.original.Active;
        const getOptions = () => {
          if (status === "TRUE") {
            return [
              {
                label: "Disable",
                action: () => handleDisable(row.original),
              },
              {
                label: "Edit",
                action: () => handleEdit(row.original),
                danger: false,
              },
              {
                label: "Delete",
                action: () => handledelete(row.original),
                danger: true,
              },
            ];
          } else if (status === "FALSE") {
            return [
              {
                label: "Enable",
                action: () => handleEnable(row.original),
              },
              {
                label: "Edit",
                action: () => handleEdit(row.original),
                danger: false,
              },
              {
                label: "Delete",
                action: () => handledelete(row.original),
                danger: true,
              },
            ];
          }
          return null;
        };
        const options = getOptions();
        if (!options) return <span className="text-gray-400 italic">N/A</span>;
        return (
          <div
            key={rowId}
            className="relative"
            ref={(el) => {
              if (isOpen) dropdownRefs.current[rowId] = el;
            }}
          >
            <Image
              src={Action}
              alt="icon"
              className="w-5 h-5 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setOpenDropdownId((prev) => (prev === rowId ? null : rowId));
              }}
            />
            {isOpen && <DropdownMenu options={options} />}
          </div>
        );
      },
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
                  onClick={() => setActiveFilter(btn.value)}
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
              <SearchFilter
                ref={searchRef}
                model="Product"
                filterOptions={filters}
                onDataFetched={handleDataFetched}
              />
              {openEditModal && (
                <Searchbtn
                  btntext="Add Product"
                  initialData={selectedProduct}
                  onSuccess={refreshProducts}
                  isEditMode={true}
                  display="flex"
                  formType="product"
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

export default ProductData;
