"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PaymentModal from "./paymentModle";
import {
  createOrder,
  createRazorpayOrder,
  verifyPayment,
} from "@/app/store/Actions/orderAction";
import { removeCart } from "@/app/store/Actions/cartAction";
import { useRouter } from "next/navigation";
import S3Image from "@/app/component/useable/S3Image";

const CartProduct = ({ complecteAddress }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const checkoutCart = useSelector((state) => state.cart);
  const cartData = checkoutCart?.cart?.data;
  const items = cartData?.cartItems || [];
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!cartData) return <p>No cart data found. Please go back to cart.</p>;

  // Prepare base orderData
  const buildOrderData = (PaymentMode) => ({
    products: items.map((i) => ({
      id: i.ProductID,
      CartoonType: i.CartoonType,
      quantity: i.Quantity,
      Price: i.Price,
    })),
    Subtotal: cartData.totalAmount,
    Discount: 0,
    Shippingcost: 0,
    totalPrice: cartData.totalAmount,
    ShippingAdress: complecteAddress,
    BillingAdress: complecteAddress,
    PaymentStatus: "pending",
    PaymentMode: PaymentMode,
  });

  // Handle COD order
  const handleCOD = async () => {
    setShowModal(false);
    const orderData = buildOrderData("cod");
    const result = await dispatch(createOrder(orderData));
    if (result.success) {
      dispatch(removeCart());
      router.push("/viewpages/orderSucess");
    } else alert("Failed: " + result.message);
  };

  // Handle Online Payment order
  const handleOnlinePay = async () => {
    setShowModal(false);
    const orderData = buildOrderData("razorpay");
    // Step 1: Create order in DB (PaymentStatus: pending)
    const result = await dispatch(createOrder(orderData));

    if (!result.success)
      return alert("Failed to create order: " + result.message);

    // const result = await dispatch()
    const { orderID, orderAmount } = result.data.result;
    // console.log({ orderID });
    // console.log({ orderAmount });

    // Step 2: Create Razorpay order to get providerOrderId
    const rpResult = await dispatch(createRazorpayOrder(orderID, orderAmount));

    if (!rpResult.success)
      return alert("Failed to create Razorpay order: " + rpResult.message);

    const providerOrderId = rpResult.payload.result.id;

    const receipt = rpResult.payload.result.receipt;

    // Step 3: Open Razorpay Checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderAmount * 100,
      currency: "INR",
      name: "Dingwani Foods",
      description: `Order #${orderID}`,
      order_id: providerOrderId,
      handler: async function (response) {
        // console.log({ response });
        setLoading(true); // 👈 SHOW LOADER WHILE VERIFYING PAYME
        const paymentData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          orderId: receipt,
        };

        // console.log({ paymentData });

        const verifyResult = await dispatch(verifyPayment(paymentData));

        if (!verifyResult.success) {
          router.push("/viewpages/orderFailed");
          return;
        }

        dispatch(removeCart());
        router.push("/viewpages/orderSucess");
      },
      theme: { color: "#3399cc" },
    };

    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Please refresh the page.");
      return;
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
        <p className="ml-3 text-lg">Processing your payment...</p>
      </div>
    );
  }

  return (
    <div className="px-5 flex flex-col">
      {/* Cart Items */}
      <div className="flex flex-col gap-3">
        {items.length > 0 ? (
          items.map((item) => {
            const imageMedia = item.Product?.media?.filter(
              (m) => m.type === "IMAGE",
            );

            const s3Key = imageMedia?.fileName;
            return (
              <div
                key={item.id}
                className="w-full border rounded-lg flex justify-between items-center px-2 py-2"
              >
                <div className="flex flex-row gap-2 items-center">
                  <div className="w-14 h-14 bg-blue-500 rounded-lg overflow-hidden">
                    {imageMedia?.length > 0 ? (
                      <div className="w-14 h-14">
                        <S3Image
                          s3Key={s3Key}
                          alt={item.Product?.ProductName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <img
                        src="/placeholder.png"
                        alt="No image"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="font-semibold text-[16px]">
                    {item.Product?.ProductName || "Unnamed Product"}
                  </div>
                </div>
                <div>₹ {item.Price * item.Quantity}</div>
              </div>
            );
          })
        ) : (
          <p>No items in cart</p>
        )}
      </div>

      {/* Total Section */}
      <div className="flex flex-col mt-4">
        <div className="flex justify-between py-2 border-b">
          <span>Subtotal:</span>
          <span>₹ {cartData.totalAmount}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-semibold text-lg mt-2">
          <span>Total:</span>
          <span>₹ {cartData.totalAmount}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="text-right">
        <button
          className="w-[50%] mt-4 bg-primary text-white py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Place Order
        </button>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        totalAmount={cartData.totalAmount}
        onCOD={handleCOD}
        onOnlinePay={handleOnlinePay}
      />
    </div>
  );
};

export default CartProduct;
