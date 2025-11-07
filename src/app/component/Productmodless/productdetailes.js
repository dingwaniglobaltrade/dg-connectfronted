"use client";
import React, { useState } from "react";
import Image from "next/image";
import StarIcon from "@/icons/productview/star.svg";
import Convenient from "@/icons/productview/convenient.svg";
import Authenticprice from "@/icons/productview/authenticprice.svg";
import Hygienically from "@/icons/productview/hygienically.svg";
import Premiumquality from "@/icons/productview/premiumquality.svg";
import Flavours from "@/icons/productview/naturalflavours.svg";
import dropdown from "@/icons/dropdown.svg";
import { useSelector, useDispatch } from "react-redux";
import { AddCartItems } from "@/app/store/Actions/cartAction";

const ProductDetails = ({ product }) => {
  const loginState = useSelector((state) => state.login);
  const UserId = loginState?.admin?.id;
  const UserType = loginState?.admin?.userType; // "admin" | "subadmin" | "distributor" | "retailer" | "salesperson"
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  // Safe check: if no product → return fallback
  if (!product || Object.keys(product).length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Product not found</p>
      </div>
    );
  }

  const features = [
    { icon: Convenient, label: "Convenient" },
    { icon: Hygienically, label: "Hygienically Packed" },
    { icon: Authenticprice, label: "Authentic Price" },
    { icon: Premiumquality, label: "Premium Grade Quality" },
  ];

  const handleAddToCart = async () => {
    if (!UserId) {
      alert("Please login first");
      return;
    }

    const selectedPrice =
      UserType === "distributor"
        ? product.LargeCartoonPrice
        : product.RetailerPrice;

    const CartData = {
      UserId,
      ProductID: product.id,
      Quantity: 1,
      CartoonType: UserType === "distributor" ? "large" : "retail",
      Price: selectedPrice,
    };

    try {
      const result = await dispatch(AddCartItems(CartData));
      console.log("Cart response:", result);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // --- UI role logic ---
  const showRetailPrice =
    UserType === "retailer" ||
    UserType === "salesperson" ||
    UserType === "admin" ||
    UserType === "subadmin";

  const showLargeCarton =
    UserType === "distributor" ||
    UserType === "admin" ||
    UserType === "subadmin";

  const showAddToCart =
    UserType === "retailer" ||
    UserType === "salesperson" ||
    UserType === "distributor"; // admins & subadmins don't get Add to Cart

  return (
    <div className="h-full flex flex-col overflow-auto">
      <div className="flex flex-col px-7 text-texthearder">
        {/* Product Name */}
        <h1 className="text-[25px] font-bold">{product.ProductName || "NA"}</h1>

        {/* Stars */}
        <div className="flex mt-1">
          {[...Array(5)].map((_, index) => (
            <Image key={index} src={StarIcon} alt="star" />
          ))}
        </div>

        {/* Flavour */}
        <div className="flex items-center gap-2 mt-2">
          <Image className="h-8 w-8" src={Flavours} alt="Flavours" />
          <span className="font-semibold text-[16px]">{product.Flavour}</span>
        </div>

        {/* MRP */}
        <div className="text-[18px] font-bold mt-2">
          MRP: <span className="font-normal">₹ {product.ProductPrice} INR</span>
        </div>

        {/* Retail Price */}
        {showRetailPrice && (
          <div className="text-[16px] font-semibold mt-1">
            Retail Price:{" "}
            <span className="font-normal">₹ {product.RetailerPrice} INR</span>
          </div>
        )}

        {/* Large Carton Price */}
        {showLargeCarton && (
          <div className="text-[16px] font-semibold flex justify-between mt-1">
            <div>
              Large Carton Price:{" "}
              <span className="font-normal text-[15px]">
                ₹ {product.LargeCartoonPrice} INR
              </span>
            </div>
            <div>
              Carton Quantity:{" "}
              <span className="font-normal text-[15px]">
                {product.LargeCartoonQuintity}
              </span>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="flex gap-3 flex-wrap mt-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="px-2 py-1 border-[2px] border-[#273389] flex items-center gap-1 rounded-[12px]"
            >
              <Image
                src={feature.icon}
                alt={feature.label}
                className="h-8 w-8"
              />
              <div className="text-[14px]">{feature.label}</div>
            </div>
          ))}
        </div>

        {/* Add to Cart */}
        {showAddToCart && (
          <div className="mt-4">
            <button
              onClick={handleAddToCart}
              className="px-36 py-2.5 rounded-[8px] text-[14px] font-medium bg-primary text-white"
            >
              ADD TO CART
            </button>
          </div>
        )}

        {/* Product Info */}
        <div className="mt-4">
          <div className="text-[18px]">Product Information</div>
          <div
            className="border-t-[2px] border-grey-500 mt-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="mt-2 flex justify-between">
              <div>
                <div className="text-[14px]">Know More About Product</div>
                {!isOpen && (
                  <div className="text-[12px] text-gray-500">Description</div>
                )}
              </div>
              <div className="mt-1">
                <Image
                  src={dropdown}
                  alt="dropdown icon"
                  height={12}
                  width={12}
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            {isOpen && (
              <div className="mt-2 text-[13px] text-gray-700 leading-[1.4rem]">
                Description: {product.ProductDescription}
                <br />
                <br />
                Single Flavor of {product.Flavour}
                <br />
                1 Unit Box contains {product.unitPerBox} x 1 flavor of {product.weightPerUnit} gm each
                {/* <br />
                Total Chocoholic Wafer in 1 Unit Box: 10 Wafers
                <br /> */}
                <br />
                Net Weight: {product.NetQuantity}
                <br />
                Unit Box Dimensions: L×H×W {product.productDimensions} cm – Weight (In Grams): {product.NetQuantity}
                <br />
                <br />
                Shelf Life: {product.shelfLife}
                <br />
                Tax: 5% | HSN Code: {product.HSNCode}
                <br />
                Unit Box MRP: ₹ {product.ProductPrice}/- inclusive of taxes
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
