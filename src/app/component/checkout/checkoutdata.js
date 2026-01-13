"use client"
import React from "react";
import CheckoutForm from "@/app/component/checkout/formdata";
import CartProduct from "@/app/component/checkout/cartProduct";
import { useState } from "react";


const checkoutdata = () => {
 const [complecteAddress, setcomplecteAddress] = useState({
  complectAddress: "",
  city: "",
  stateName: "",
  pincode: "",
});


  return (
    <div className="lg:h-[90%] md:h-[90%] h-full w-full bg-[#f8f9fa] lg:px-5 md:px-5 px-2 py-4">
      <div className="lg:h-[600px] md:h-[600px] h-full lg:px-10 md:px-6 px-2 py-4 bg-white rounded-md overflow-y-auto">
        <h1 className="font-semibold text-[16px]">Cart / Checkout</h1>
        <div className="lg:flex md:flex sm:hidden hidden flex-row">
          <div className="w-[50%] h-full">
            <CheckoutForm setcomplecteAddress ={setcomplecteAddress} />
          </div>
          <div className="w-[50%] h-full">
            <CartProduct complecteAddress={complecteAddress} />
          </div>
        </div>

        <div className="lg:hidden md:hidden flex flex-col">
          <div className="w-fill h-auto">
            <CheckoutForm  setcomplecteAddress ={setcomplecteAddress} />
          </div>
          <div className="w-full h-auto mt-3">
            <CartProduct complecteAddress={complecteAddress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default checkoutdata;
