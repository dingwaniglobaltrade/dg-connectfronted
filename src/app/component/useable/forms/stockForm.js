"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  asyncfetchproduct,
  updateStockProduct,
} from "@/app/store/Actions/productAction";
import { toast } from "react-toastify";

const StockForm = ({ initialData = {}, isEditMode = false, onSubmit }) => {
  const dispatch = useDispatch();
  const [stockData, setStockData] = useState({
    ProductName: "",
    LargeCartoonStock: "",
    RetaileStock: "",
    productId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // Fetch routes
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await dispatch(asyncfetchproduct());

        if (result?.products) {
          setProducts(result.products);
        }
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
    fetchProduct();
  }, [dispatch]);

  useEffect(() => {
    if (isEditMode && initialData) {
      setStockData(initialData);
    }
  }, [initialData, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStockData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductSelect = (e) => {
    const selectedId = e.target.value;
    const selectedProduct = products.find((p) => p.id === selectedId);

    setStockData((prev) => ({
      ...prev,
      ProductName: selectedProduct?.ProductName || "",
      productId: selectedId,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const { productId, ...stockFields } = stockData; // Destructure productId
      // Send productId and rest of the form separately
      await dispatch(updateStockProduct(productId, stockFields));

      if (onSubmit) onSubmit(stockData);

      toast.success("Stock Updated Sucessfully");
    } catch (error) {
      console.error("Failed to update stock:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-1 grid-cols-1">
          <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 text-[12px] mt-2">
            <div>
              <label className="text-texthearder font-semibold">
                {" "}
                Product Name
              </label>
              <select
                name="productId"
                value={stockData.productId || ""}
                onChange={handleProductSelect}
                required
                className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
              >
                <option value="">Select Product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.ProductName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-texthearder font-semibold">
                Large Cartoon Stock
              </label>
              <input
                className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
                type="text"
                name="LargeCartoonStock"
                value={stockData.LargeCartoonStock}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-texthearder font-semibold">
                Small Cartoon Stock
              </label>
              <input
                className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
                type="text"
                name="RetaileStock"
                value={stockData.RetaileStock}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end w-full">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-primary text-[12px] text-white mt-4 px-6 py-2 mb-4 rounded
    ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"}
  `}
          >
            {isLoading ? "Adding..." : " Add Stock"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockForm;
