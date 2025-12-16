"use client";
import React, { useEffect, useState } from "react";
import { asyncfetchproduct } from "@/app/store/Actions/productAction";
import { getImageUrl } from "@/app/utils/imageurl";

import { useRouter } from "next/navigation";
import { AddCartItems } from "@/app/store/Actions/cartAction";
import { useDispatch, useSelector } from "react-redux";

const productcard = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const loginState = useSelector((state) => state.login);
  const UserId = loginState?.admin?.id; // or from localStorage
  const UserType = loginState?.admin?.userType;

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

  const handleAddToCart = async (product) => {
    if (!UserId) {
      alert("Please login first");
      return;
    }

    // pick correct price based on role
    const selectedPrice =
      UserType === "distributor"
        ? product.LargeCartoonPrice // distributor sees LargeCartoonPrice
        : product.RetailerPrice;

    const CartData = {
      UserId: UserId,
      ProductID: product.id, // Product id
      Quantity: 1, // default to 1, or let user choose
      CartoonType: UserType === "distributor" ? "large" : "retail",
      Price: selectedPrice,
    };

    try {
      const result = await dispatch(AddCartItems(CartData));
      console.log("Cart response:");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  //condition to control add to cart and go to cart
  const cartData = useSelector((state) => state.cartItems); // full cart object
  const cartItems = cartData?.cart || []; // products inside cart
  // console.log("cartData:", cartData);
  // console.log("cartItems:", cartItems);

  return (
    <div className="lg:h-[90vh] md:h-[92vh] h-[90vh] w-full bg-[#f8f9fa] lg:px-5 md:px-5 px-2 py-4">
      <div className="lg:h-[98%] bg-white md:[100%] h-[96%] lg:px-4 md:px-6 px-2 py-4 rounded-md overflow-y-auto">
        <div className="flex flex-wrap gap-5 lg:justify-start ms:justify-start justify-center">
          {products.map((product, index) => {
            const isInCart = cartItems.some(
              (item) => item.ProductID === product.id
            );
            return (
              <div
                key={index}
                className="w-[270px] h-[325px] border-[1px] rounded-[10px] border-gray-200 cursor-pointer"
              >
                {/* Product Image */}
                <div
                  className="h-[60%] w-full bg-blue-200 rounded-[10px]"
                  onClick={() =>
                    window.open(
                      `/portalpages/allproduct/${product.id}`,
                      "_blank"
                    )
                  }
                >
                  <img
                    src={getImageUrl(
                      product.media?.[1]?.fileName ||
                        product.media?.[0]?.fileName
                    )}
                    alt={product.ProductName}
                    className="h-full w-full object-cover object-center rounded-[10px]"
                  />
                </div>

                {/* Product Info */}
                <div className="w-full px-2 py-3 flex flex-col gap-1">
                  <h2 className="text-gray-500 text-[16px] ">
                    {product.ProductName}
                  </h2>
                  <h1 className="font-bold text-black text-[20px]">
                    ₹{" "}
                    {UserType === "distributor"
                      ? product.LargeCartoonPrice // distributor sees LargeCartoonPrice
                      : product.RetailerPrice}
                  </h1>

                  <div className="flex flex-row justify-end border-t-[1px] border-gray-100 py-2">
                    {/* <div className="h-7 w-16 rounded-full bg-yellow-500 text-white font-medium flex gap-1 justify-center items-center">
                      <HiStar className="text-white text-[18px]" />{" "}
                      {product.AvgRatings}
                    </div> */}

                    {isInCart ? (
                      <button
                        onClick={() => router.push("/cart")}
                        className="bg-green-500 py-1 px-5 text-white rounded-[10px]"
                      >
                        Go to Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-primary py-1 px-5 text-white rounded-[10px]"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default productcard;
