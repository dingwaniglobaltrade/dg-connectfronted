"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { FetchOrderDetailesByID } from "@/app/store/Actions/orderAction";

import PhoneIcon from "@/icons/phoneIcon.svg";
import EmailIcons from "@/icons/mailIcon.svg";
import LocationPin from "@/icons/map-Pin.svg";
import Image from "next/image";

const DaynamiceOrderDetailes = () => {
  const { orderId: id } = useParams();
  console.log("order id from params", id);
  const dispatch = useDispatch();
  const [orderDetailes, setOrderDetailes] = useState(null);

  //   // Get order detail from Redux (assuming your action updates this)
  //   const orderDetailFromStore = useSelector((state) => state.order.orderDetail);
  //   const loading = useSelector((state) => state.order.loading);
  //   const error = useSelector((state) => state.order.error);

  useEffect(() => {
    const fetchOrders = async () => {
      if (id) {
        console.log({ id });

        const result = await dispatch(FetchOrderDetailesByID(id));
        console.log({ result });
        setOrderDetailes(result.data);
      }
    };
    fetchOrders();
  }, [id, dispatch]);

  console.log({ orderDetailes });

  // Define status styles
  const statusStyles = {
    Accepted: "bg-[#E8F8EF] text-[#39BA74] border-[1px] border-[#39BA74]",
    Pending: "bg-[#FFF7E8] text-[#F2A900] border-[1px] border-[#F2A900]",
    Cancelled: "bg-[#FFEDED] text-[#EB5757] border-[1px] border-[#EB5757]",
    Return: "bg-[#E8F0FF] text-[#2F80ED] border-[1px] border-[#2F80ED]",
    Delivered: "bg-[#F0FFF6] text-[#27AE60] border-[1px] border-[#27AE60]",
    Track: "bg-[#FFF0F5] text-[#D63384] border-[1px] border-[#D63384]",
    Shipped: "bg-[#E8F8FF] text-[#0CAFFF] border-[1px] border-[#0CAFFF]",
  };

  return (
    <div className="px-6 pt-3">
      {orderDetailes ? (
        <>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-4">
              <h1 className="text-[19px] txt-black font-semibold">
                Order ID : <span>{orderDetailes.id}</span>
              </h1>
              <div
                className={`px-4 py-1 rounded-[10px] ${
                  statusStyles[orderDetailes.orderStatus] ||
                  "bg-gray-200 text-gray-800 border-[1px] border-gray-400"
                }`}
              >
                {orderDetailes.orderStatus}
              </div>
            </div>
            <div className="text-sm">
              {new Date(orderDetailes.createdAt).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </div>
          </div>

          <div className="flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col mt-5 gap-3 w-full">
            {/* Order Items */}
            <div className="border-[1px] border-gery-50 px-2 py-2 rounded-[10px] 2xl:w-[50%] xl:w-[50%] lg:w-[50%] md:w-[50%] w-[100%]">
              <h1 className="text-[18px] font-bold">Order Items</h1>

              {orderDetailes.OrderItems?.length > 0 ? (
                orderDetailes.OrderItems.map((item) => (
                  <div
                    key={item.id}
                    className="px-2 py-2 flex flex-row gap-5 border-b-[1px] border-grey-300"
                  >
                    <img
                      src={item.Product.media?.[0]?.url || "/placeholder.png"}
                      alt={item.Product.ProductName}
                      className="w-16 h-16 rounded-[10px]"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-[16px] font-semibold">
                        {item.Product.ProductName}
                      </h1>
                      <h1>
                        <span className="">Quantity</span> : {item.Quantity}
                      </h1>
                      <h1>
                        <span className="">Price</span> : ₹ {item.Price}
                      </h1>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No order items available.
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="border-[1px] border-gery-50 px-2 py-2 rounded-[10px] 2xl:w-[50%] xl:w-[50%] lg:w-[50%] md:w-[50%] w-[100%]">
              <div className="flex justify-between ">
                <h1 className="text-[18px] font-bold">Order Summary</h1>
                <div
                   className={`px-4 py-1 rounded-[10px] ${
                  statusStyles[orderDetailes.orderStatus] ||
                  "bg-gray-200 text-gray-800 border-[1px] border-gray-400"
                }`}
              >
                {orderDetailes.orderStatus}
                </div>
              </div>

              <div className="flex flex-col mt-6 px-3 gap-1">
                <div className="flex justify-between">
                  <div>Subtotal</div>
                  <div>₹ {orderDetailes.Subtotal}</div>
                </div>
                <div className="flex justify-between">
                  <div>Discount</div>
                  <div>₹ {orderDetailes.Discount}</div>
                </div>
                <div className="flex justify-between">
                  <div>Shipping</div>
                  <div>₹ {orderDetailes.Shippingcost}</div>
                </div>

                <div className="flex justify-between font-semibold mt-3 border-b-[1px] border-grey-50">
                  <div>Total</div>
                  <div> ₹ {orderDetailes.totalPrice}</div>
                </div>

                <div className="flex justify-between mt-3 font-semibold">
                  <div>Payment Status </div>
                  <div>{orderDetailes.PaymentStatus.toUpperCase()}</div>
                </div>
              </div>

              {/* Contact Information */}
              {/* Contact Information */}
              <div className="mt-4">
                <h1 className="text-[18px] font-bold mb-1">
                  Contact Information
                </h1>
                <div className="flex flex-col px-3 gap-2">
                  <div className="flex gap-2">
                    <Image src={EmailIcons} alt="email Icon" />
                    <div>
                      {orderDetailes.DistributorCustomer?.email
                        ? orderDetailes.DistributorCustomer.email
                        : orderDetailes.RetailerCustomer?.email || "N/A"}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Image src={PhoneIcon} alt="Phone Icon" />
                    <div>
                      {orderDetailes.DistributorCustomer?.mobile
                        ? orderDetailes.DistributorCustomer.mobile
                        : orderDetailes.RetailerCustomer?.mobile || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="mt-4 mb-2">
                <h1 className="text-[18px] font-bold mb-1">Address Detailes</h1>
                <div className="flex flex-col px-3 gap-2">
                  <div className="flex gap-2">
                    <Image src={LocationPin} alt="Location Icon" />
                    <div>
                      {orderDetailes.ShippingAdress?.replace(/\"/g, "")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-6 text-gray-500">
          No order details available.
        </div>
      )}
    </div>
  );
};

export default DaynamiceOrderDetailes;
