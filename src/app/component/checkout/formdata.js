"use client";
import React, { useEffect, useState } from "react";
import {
  fetchCurrentUser,
  updateCurrentUser,
} from "@/app/store/Actions/loginAction";
import {editDistributordetailes } from "@/app/store/Actions/distributorAction";
import { editRetailerdetailes} from "@/app/store/Actions/retailerAction";
import { useDispatch, useSelector } from "react-redux";

import DistributorForm from "./distributorForm";
import RetailerForm from "./retailerForm";
import { toast } from "react-toastify";

const FormData = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);

  const admin = loginState?.admin;
  const userType = loginState?.admin?.userType;

  // single state
  const [formValues, setFormValues] = useState({
    name: "",
    mobile: "",
    email: "",
    firmName: "",
    gstn: "",
    address: "", // for retailer (string address)
    shopName: "",
    shopImage: "",

    // distributor fields
    complectAddress: "",
    city: "",
    stateName: "",
    pincode: "",
  });

  // Fetch user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !admin) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  // Populate state from admin
  useEffect(() => {
    if (admin) {
      if (userType === "retailer") {
        setFormValues((prev) => ({
          ...prev,
          name: admin?.name || "",
          mobile: admin?.mobile || "",
          email: admin?.email || "",
          firmName: admin?.firmName || "",
          gstn: admin?.gstn || "",
          shopName: admin?.shopName || "",
          address: admin?.address || "", // retailer has only string address
          shopImage: admin?.shopImage || "",
        }));
      } else if (userType === "distributor") {
        const address = admin?.address?.[0] || {};
        setFormValues((prev) => ({
          ...prev,
          name: admin?.name || "",
          mobile: admin?.mobile || "",
          email: admin?.email || "",
          firmName: admin?.firmName || "",
          gstn: admin?.gstn || "",
          shopName: admin?.shopName || "",
          complectAddress: address?.complectAddress || "",
          city: address?.city || "",
          stateName: address?.stateName || "",
          pincode: address?.pincode || "",
        }));
      }
    }
  }, [admin, userType]);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
const handleSubmit = async (e) => {
  e.preventDefault();
  const id = admin.id;

  let payload;
  let result;

  if (userType === "retailer") {
    payload = {
      name: formValues.name,
      mobile: formValues.mobile,
      email: formValues.email,
      shopName: formValues.shopName,
      gstn: formValues.gstn,
      address: formValues.address,
      shopImage: formValues.shopImage,
    };

    // Call retailer-specific action
    result = await dispatch(editRetailerdetailes(id, payload));
   if(result?.success){
    toast.success("Your Detailes Updated Sucessfully")
   }
   
  } else if (userType === "distributor") {
    payload = {
      ...formValues,
      address: [
        {
          complectAddress: formValues.complectAddress,
          city: formValues.city,
          stateName: formValues.stateName,
          pincode: formValues.pincode,
        },
      ],
    };

    // Call distributor-specific action
    result = await dispatch(editDistributordetailes(id, payload));
    // console.log({result});
    
     if(result?.success){
    toast.success("Your Detailes Updated Sucessfully")
   }
   
  }

};


  return (
    <div className="py-3">
      {userType === "distributor" ? (
        <DistributorForm
          formValues={formValues}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      ) : userType === "retailer" ? (
        <RetailerForm
          formValues={formValues}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <p className="text-gray-500">No form available for this user type</p>
      )}
    </div>
  );
};

export default FormData;
