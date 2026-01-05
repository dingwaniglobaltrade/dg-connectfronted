"use client";
import React, { useEffect, useState } from "react";
import { asyncfetchproduct } from "@/app/store/Actions/productAction";
import { getImageUrl } from "@/app/utils/imageurl";
import { useRouter } from "next/navigation";
import { AddCartItems } from "@/app/store/Actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import LogoLoader from "../LogoLoader";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [addedProductIds, setAddedProductIds] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();

  /**
   * ===============================
   * USER INFO
   * ===============================
   */
  const loginState = useSelector((state) => state.login);
  const UserId = loginState?.admin?.id;
  const UserType = loginState?.admin?.userType;

  /**
   * ===============================
   * CART FROM REDUX (CORRECT PATH)
   * ===============================
   */
  const cartItems = useSelector(
    (state) => state.cart?.cart?.data?.cartItems || []
  );

  /**
   * ===============================
   * FETCH PRODUCTS
   * ===============================
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(asyncfetchproduct());
        if (result?.products) {
          setProducts(result.products);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  /**
   * ===============================
   * ADD TO CART HANDLER
   * ===============================
   */
  const handleAddToCart = async (product) => {
    if (!UserId) {
      alert("Please login first");
      return;
    }

    setLoadingProductId(product.id);

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

      if (result?.success === true) {
        setAddedProductIds((prev) => [...new Set([...prev, product.id])]);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoadingProductId(null);
    }
  };

  /**
   * ===============================
   * UI
   * ===============================
   */

  return (
    <div className="lg:h-[90vh] md:h-[92vh] h-[90vh] w-full bg-[#f8f9fa] px-4 py-4">
      <div className="bg-white h-full rounded-md p-4 overflow-y-auto">
        <div className="flex flex-wrap gap-5 justify-center lg:justify-start">
          {products.map((product) => {
            const isInCart =
              cartItems.some((item) => item.ProductID === product.id) ||
              addedProductIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="w-[270px] h-[325px] border rounded-lg border-gray-200"
              >
                {/* IMAGE */}
                <div
                  className="h-[60%] w-full bg-gray-200 rounded-lg cursor-pointer"
                  onClick={() =>
                    window.open(
                      `/portalpages/allproduct/${product.id}`,
                      "_blank"
                    )
                  }
                >
                  {product.media?.length ? (
                    <img
                      src={getImageUrl(
                        product.media.find((m) => m.type === "IMAGE")
                          ?.fileName || product.media[0]?.fileName
                      )}
                      alt={product.ProductName}
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div className="px-2 py-3 flex flex-col gap-1">
                  <h2 className="text-gray-500 text-sm">
                    {product.ProductName}
                  </h2>

                  <h1 className="font-bold text-lg">
                    ₹{" "}
                    {UserType === "distributor"
                      ? product.LargeCartoonPrice
                      : product.RetailerPrice}
                  </h1>

                  {/* ACTION BUTTON */}
                  <div className="flex justify-end border-t pt-2">
                    {isInCart ? (
                      <button
                        onClick={() => router.push("/viewpages/cart")}
                        className="bg-green-500 px-5 py-1 text-white rounded-md"
                      >
                        View Cart
                      </button>
                    ) : (
                      <button
                        disabled={loadingProductId === product.id}
                        onClick={() => handleAddToCart(product)}
                        className="bg-primary px-5 py-1 text-white rounded-md disabled:opacity-50"
                      >
                        {loadingProductId === product.id
                          ? "Adding..."
                          : "Add to Cart"}
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

export default ProductCard;
