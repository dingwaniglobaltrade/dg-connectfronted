"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchCartData,
  updateCartQuantity,
  removeProductFromCart,
} from "@/app/store/Actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashCan } from "react-icons/fa6";

import S3Image from "@/app/component/useable/S3Image";

export default function CartPage() {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [carttotal, setCartTotal] = useState({});
  const router = useRouter();

  const loginState = useSelector((state) => state.login);
  const id = loginState?.admin?.id; // or from localStorage

  useEffect(() => {
    if (!id) return; // run only when id exists
    const fetchAllCartItems = async () => {
      try {
        const result = await dispatch(fetchCartData(id));
        if (result?.data) {
          setCartItems(result.data.cartItems || []); // extract only array

          setCartTotal(result.data || []);
        }
      } catch (error) {
        console.log("Error fetching Salepsersons", error);
      }
    };
    fetchAllCartItems();
  }, [dispatch, id]);

  // Increase Quantity
  const increaseQty = async (ProductID) => {
    const result = await dispatch(
      updateCartQuantity(id, ProductID, "increase"),
    );
    if (result?.success) {
      const refreshed = await dispatch(fetchCartData(id));
      setCartItems(refreshed.data.cartItems || []);
      setCartTotal(refreshed.data || {}); // <-- update total
    }
  };

  // Decrease Quantity
  const decreaseQty = async (ProductID) => {
    const result = await dispatch(
      updateCartQuantity(id, ProductID, "decrease"),
    );
    if (result?.success) {
      const refreshed = await dispatch(fetchCartData(id));
      setCartItems(refreshed.data.cartItems || []);
      setCartTotal(refreshed.data || {}); // <-- update total
    }
  };

  const handleRemove = async (ProductID) => {
    try {
      const result = await dispatch(removeProductFromCart(id, ProductID));

      if (result?.success) {
        // Update UI
        setCartItems((prev) =>
          prev.filter((item) => item.ProductID !== ProductID),
        );
      } else {
        console.error("Failed to delete product:", result?.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handlePlaceOrder = () => {
    if (!id) {
      // not logged in
      router.push("/login");
      return;
    }

    if (cartItems.length === 0) {
      // cart empty
      router.push("/viewpages/productpages");
      return;
    }

    // valid → go to checkout
    router.push("/viewpages/checkout");
  };

  const handleProducts = () => {
    router.push("/viewpages/productpages");
  };

  return (
    <div className="py-4">
      <div className="hidden md:block lg:flex">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-[16px]">
              <th className="p-3 text-left font-semibold">Product</th>
              <th className="p-3 text-center font-semibold">Price</th>
              <th className="p-3 text-center font-semibold">Quantity</th>
              <th className="p-3 text-center font-semibold">Sub Total</th>
              <th className="p-3 text-center font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b text-center">
                {/* Product column stays left aligned with image + text */}
                <td className="p-3 flex items-center gap-3 font-semibold text-left">
                  {item.Product.media && item.Product.media.length > 0 ? (
                    item.Product.media[0].url.endsWith(".glb") ? (
                      <img
                        src="/3d-placeholder.png"
                        alt={item.Product.ProductName}
                        className="w-12 h-12 bg-gray-200 rounded-[10px]"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-[10px]">
                        <S3Image
                          s3Key={item.Product.media[0].fileName}
                          alt={item.Product.ProductName}
                          className="w-full h-full rounded-[10px]"
                        />
                      </div>
                    )
                  ) : (
                    <img
                      src="/default-product.png"
                      alt={item.Product.ProductName}
                      className="w-12 h-12 bg-gray-200 rounded-[10px]"
                    />
                  )}

                  {item.Product.ProductName}
                </td>

                {/* Price */}
                <td className="p-3">₹ {item.Price}</td>

                {/* Quantity with flex but centered inside */}
                <td className="p-3">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => decreaseQty(item.ProductID)}
                    >
                      -
                    </button>
                    <span>{item.Quantity}</span>
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => increaseQty(item.ProductID)}
                    >
                      +
                    </button>
                  </div>
                </td>

                {/* Subtotal */}
                <td className="p-3">₹ {item.Price * item.Quantity} </td>

                <td className="cursor-pointer text-center cursor-pointer">
                  <button
                    type="button"
                    className="mx-auto flex items-center justify-center cursor-pointer"
                    onClick={() => handleRemove(item.ProductID)} // <-- wrapped arrow, pass id only
                    aria-label={`Remove ${
                      item?.Product?.ProductName ?? "item"
                    }`}
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* mobile responseive cart data card */}
      <div className="lg:hidden md:hidden mb-3">
        <div className="flex flex-col gap-3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="w-full h-auto p-4 bg-gray-100 rounded-[10px] flex flex-row gap-3"
            >
              <div className="w-[30%] h-full rounded-[10px]">
                {item.Product.media && item.Product.media.length > 0 ? (
                  item.Product.media[0].url.endsWith(".glb") ? (
                    <img
                      src="/3d-placeholder.png"
                      alt={item.Product.ProductName}
                      className="w-full h-full bg-gray-400 rounded-[10px]"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 ">
                      <S3Image
                        s3Key={item.Product.media[0].fileName}
                        alt={item.Product.ProductName}
                        className="rounded-[10px] w-full h-full"
                      />
                    </div>
                  )
                ) : (
                  <img
                    src="/default-product.png"
                    alt={item.Product.ProductName}
                    className="w-12 h-12 bg-gray-200 rounded-[10px]"
                  />
                )}
              </div>

              <div className="flex flex-col gap-1 w-full">
                <div className="w-full text-[16px] font-semibold flex justify-between">
                  <div> {item.Product.ProductName} </div>
                  <div>
                    <button
                      type="button"
                      className="mx-auto flex items-center justify-center cursor-pointer"
                      onClick={() => handleRemove(item.ProductID)} // <-- wrapped arrow, pass id only
                      aria-label={`Remove ${
                        item?.Product?.ProductName ?? "item"
                      }`}
                    >
                      <FaTrashCan />
                    </button>
                  </div>
                </div>
                <div>
                  <span className="font-semibold">Price</span> :{""} ₹
                  {item.Price}
                </div>
                <div className="flex flex-row gap-2">
                  <button
                    className="px-2 py-[2px] border rounded"
                    onClick={() => decreaseQty(item.ProductID)}
                  >
                    -
                  </button>
                  <span>{item.Quantity}</span>
                  <button
                    className="px-2 py-[2px] border rounded"
                    onClick={() => increaseQty(item.ProductID)}
                  >
                    +
                  </button>
                </div>
                <div>
                  <span className="font-semibold">Subtotal </span>: ₹{" "}
                  {item.Price * item.Quantity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-[12px] flex justify-end mt-4">
        <button
          onClick={handleProducts}
          className="py-2 rounded-[4px] border-black border-[1px] px-6 font-semibold"
        >
          Return To Product
        </button>
      </div>

      {/* {Cart data} */}
      <div className="flex justify-end">
        <div className="mt-6 lg:w-80 md:w-80 w-full border p-4 rounded text-[14px]">
          <h3 className="text-[16px] font-semibold mb-2">Cart Total</h3>
          <div className="flex justify-between py-2 border-b-[1px] border-grey-200">
            <span>Subtotal:</span>
            <span>₹ {carttotal.totalAmount}</span>
          </div>
          <div className="flex justify-between mb-2 py-2 border-b-[1px] border-grey-200">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mt-2 ">
            <span>Total:</span>
            <span>₹ {carttotal.totalAmount}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full mt-4 bg-primary text-white py-2 rounded"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
}
