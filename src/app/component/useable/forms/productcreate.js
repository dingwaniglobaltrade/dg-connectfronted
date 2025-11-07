// components/forms/ProductForm.js
"use client";
import React, { useEffect, useState } from "react";
import {
  createProduct,
  asyncfetchproduct,
  editProductdetailes,
} from "@/app/store/Actions/productAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProductForm = ({ initialData = {}, isEditMode = false }) => {
  console.log({ initialData });
  console.log(isEditMode);

  const dispatch = useDispatch();

  const [productFormData, setProductFormData] = useState({
    ProductName: "",
    ProductDescription: "",
    ProductPrice: "",
    Flavour: "",
    Active: "",
    NetQuantity: "",
    HSNCode: "",
    RetailerPrice: "",
    RetaileStock: "",
    LargeCartoonPrice: "",
    LargeCartoonQuintity: "",
    LargeCartoonStock: "",
    ProductImage: [],
    shelfLife: "",
    productCode: "",
    productDimensions: "",
    unitPerBox: "",
    weightPer: "",
  });

  const [imagePreviews, setImagePreviews] = useState([]);

toast("Default message");


  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  // On mount: If editing, populate form
  useEffect(() => {
    if (initialData) {
      const sanitized = Object.fromEntries(
        Object.entries(initialData).map(([key, val]) => [key, val ?? ""])
      );
      setProductFormData((prev) => ({ ...prev, ...sanitized }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;
      const formData = new FormData();

      // ----- CREATE / EDIT MODE -----
      Object.entries(productFormData).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          // Multiple product images
          if (key === "ProductImage" && Array.isArray(value)) {
            value.forEach((file) => {
              formData.append("ProductImage", file); // Must match multer array field name
            });
          } else {
            formData.append(key, value); // All other fields
          }
        }
      });

      // Check if in EDIT mode with no changes
      if (initialData && [...formData.keys()].length === 0) {
        toast.info("No changes detected.");
        return;
      }

      // console.log(
      //   initialData
      //     ? "Updating Product with Data:"
      //     : "Creating Product with Data:",
      //   [...formData.entries()]
      // );

      // Dispatch appropriate action
      if (!initialData) {
        result = await dispatch(createProduct(formData));
      } else {
        result = await dispatch(editProductdetailes(initialData.id, formData));
      }
console.log({result:result.success});

      // ----- COMMON RESULT HANDLING -----
      if (result?.success) {
        toast.success(
          `Product ${initialData ? "updated" : "created"} successfully!`
        );

        if (!initialData) {
          setProductFormData({
            ProductName: "",
            ProductDescription: "",
            ProductPrice: "",
            Flavour: "",
            NetQuantity: "",
            Active: "",
            HSNCode: "",
            RetailerPrice: "",
            RetaileStock: "",
            LargeCartoonPrice: "",
            LargeCartoonQuintity: "",
            LargeCartoonStock: "",
            ProductImage: [], // ✅ reset as array
            Product3D: null, // reset 3D model file
            shelfLife: "",
            productCode: "",
            productDimensions: "",
            unitPerBox: "",
            weightPer: "",
          });
        }

        dispatch(asyncfetchproduct());
      } else {
        toast.warn(result?.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Product Submit Error:", err);
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-1 grid-cols-1 ">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 text-[12px] mt-2">
          <div>
            <label className="text-texthearder font-semibold">
              Product Name
            </label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="text"
              name="ProductName"
              value={productFormData.ProductName || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-texthearder font-semibold">
              Product Images
            </label>
            <input
              className="w-full py-1 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="file"
              name="ProductImage"
              multiple
              accept="image/*,.glb"
              onChange={(e) => {
                const files = Array.from(e.target.files);

                // Separate images and GLB
                const newImages = files.filter((file) =>
                  file.type.startsWith("image/")
                );
                const newGlb = files.find((file) =>
                  file.name.toLowerCase().endsWith(".glb")
                );

                // Update state for images
                setProductFormData((prev) => ({
                  ...prev,
                  ProductImage: [
                    ...prev.ProductImage,
                    ...newImages,
                    ...(newGlb ? [newGlb] : []),
                  ],
                }));

                // Create previews for images only (skip glb preview)
                const newImagePreviews = newImages.map((file) =>
                  URL.createObjectURL(file)
                );
                setImagePreviews((prev) => [...prev, ...newImagePreviews]);
              }}
            />

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {imagePreviews.map((src, index) => (
                  <div
                    key={index}
                    className="relative w-20 h-20 border rounded overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`preview-${index}`}
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        // remove preview
                        setImagePreviews((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                        // remove file from ProductImage
                        setProductFormData((prev) => {
                          const updated = [...prev.ProductImage];
                          updated.splice(index, 1);
                          return { ...prev, ProductImage: updated };
                        });
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-bl"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="text-texthearder font-semibold">
              Product Status
            </label>
            <select
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              name="Active"
              value={productFormData.Active || ""}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="TRUE">Available</option>
              <option value="FALSE">Disable</option>
            </select>
          </div>
          {/* <div>
            <label className="text-texthearder font-semibold">
              Total Stock
            </label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="text"
              name="TotalStock"
              value={productFormData.TotalStock || ""}
              onChange={handleChange}
            />
          </div> */}
        </div>
        <div className="text-[12px] mt-2 gap-4 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
          <div>
            <label className="text-texthearder font-semibold">
              Descripition
            </label>
            <textarea
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px] resize-none"
              type="text"
              name="ProductDescription"
              value={productFormData.ProductDescription || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mt">
            <label className="text-texthearder font-semibold">
              Product 3D Model (.glb)
            </label>
            <input
              className="w-full py-1 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="file"
              accept=".glb"
              onChange={(e) => {
                const file = e.target.files[0];
                setProductFormData((prev) => ({
                  ...prev,
                  ProductImage: [
                    ...prev.ProductImage.filter(
                      (f) => !f.name.endsWith(".glb")
                    ),
                    file,
                  ],
                }));
              }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 text-[12px] mt-4">
          <div>
            <label className="text-texthearder font-semibold">
              Large Cartoon Price
            </label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="text"
              name="LargeCartoonPrice"
              value={productFormData.LargeCartoonPrice || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-texthearder font-semibold">
              Large Cartoon Quintity
            </label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="text"
              name="LargeCartoonQuintity"
              value={productFormData.LargeCartoonQuintity || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-texthearder font-semibold">
              Large Cartoon Stock
            </label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="text"
              name="LargeCartoonStock"
              value={productFormData.LargeCartoonStock || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 text-[12px] mt-4">
          <div>
            <label className="text-texthearder font-semibold">
              Retailer Price
            </label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="text"
              name="RetailerPrice"
              value={productFormData.RetailerPrice || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-texthearder font-semibold">
              Retaile Stock
            </label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="text"
              name="RetaileStock"
              value={productFormData.RetaileStock || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-texthearder font-semibold">
              Product Dimensions
            </label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="text"
              name="productDimensions"
              placeholder="L×H×W"
              value={productFormData.productDimensions || ""}
              onChange={handleChange}
            />
          </div>

          {/* 
          <div>
            <label className="text-texthearder font-semibold">
              Small Cartoon Stock
            </label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="text"
              name="SmallCartoonStock"
              value={productFormData.SmallCartoonStock || ""}
              onChange={handleChange}
            />
          </div> */}
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-4 text-[12px] mt-2">
          <div>
            <label className="text-texthearder font-semibold">MRP</label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="text"
              name="ProductPrice"
              value={productFormData.ProductPrice || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-texthearder font-semibold">HSN Code</label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="text"
              name="HSNCode"
              value={productFormData.HSNCode || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-texthearder font-semibold">Flavor </label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="text"
              name="Flavour"
              value={productFormData.Flavour || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-texthearder font-semibold">
              Net Quintiy (In Grams)
            </label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="text"
              name="NetQuantity"
              value={productFormData.NetQuantity || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-4 text-[12px] mt-2">
          <div>
            <label className="text-texthearder font-semibold">Shelf Life</label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="text"
              name="shelfLife"
              value={productFormData.shelfLife || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-texthearder font-semibold">
              Product Code
            </label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="text"
              name="productCode"
              value={productFormData.productCode || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-texthearder font-semibold">
              Unit Per Box
            </label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="text"
              name="unitPerBox"
              value={productFormData.unitPerBox || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-texthearder font-semibold">
              Weight Per pieace
            </label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="text"
              name="weightPer"
              value={productFormData.weightPer || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end w-full">
        <button
          type="submit"
          className="bg-primary text-[12px] text-white mt-4 px-6 py-2 mb-4 rounded"
        >
          {initialData ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
