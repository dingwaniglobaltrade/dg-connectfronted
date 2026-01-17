"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CreateEnquries } from "@/app/store/Actions/enquriesAction";
import { toast } from "react-toastify";


const EnquiryForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    age: "",
    qualification: "",
    mobile: "",
    email: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    Company: "",
    bussinessAddress: "",
    bussinessNature: "",
    experienceInCurrentBussiness: "",
    BussinessType: "",
    annualRevenue: "",
    BusinessBrief: "",
    infrastructure: "",
    vehicle: "",
    interestReason: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(CreateEnquries(formData));

    if (result.success) {
      toast.success("Enquiry submitted successfully");
      setFormData({
        FirstName: "",
        LastName: "",
        age: "",
        qualification: "",
        mobile: "",
        email: "",
        city: "",
        zip: "",
        state: "",
        country: "",
        Company: "",
        bussinessAddress: "",
        bussinessNature: "",
        experienceInCurrentBussiness: "",
        BussinessType: "",
        annualRevenue: "",
        BusinessBrief: "",
        infrastructure: "",
        vehicle: "",
        interestReason: "",
      });
    } else {
      alert(result.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:px-[120px] md:px-[100px] sm:px-5 px-5 flex flex-col gap-8 mt-8"
    >
      <div className="w-full bg-[#ED7A031A] px-4 sm:px-8 lg:px-24 py-16 rounded-[20px]">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl">
            LET’S TEAM UP
          </h1>
        </div>

        {/* Personal Info */}
        <div className="mt-10">
          <h3 className="h3-class-css">Personal information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mb-8">
            <input name="FirstName" value={formData.FirstName} onChange={handleChange} className="form-input" placeholder="First Name *" required />
            <input name="LastName" value={formData.LastName} onChange={handleChange} className="form-input" placeholder="Last Name *" required />
            <input name="age" value={formData.age} onChange={handleChange} className="form-input" placeholder="Age" />
            <input name="qualification" value={formData.qualification} onChange={handleChange} className="form-input" placeholder="Qualification" />
          </div>

          {/* Contact Info */}
          <h3 className="h3-class-css">Contact information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mb-8">
            <input name="mobile" value={formData.mobile} onChange={handleChange} className="form-input" placeholder="Phone *" required />
            <input name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="Email *" required />
            <input name="city" value={formData.city} onChange={handleChange} className="form-input" placeholder="City" />
            <input name="zip" value={formData.zip} onChange={handleChange} className="form-input" placeholder="Zip" />
            <input name="state" value={formData.state} onChange={handleChange} className="form-input" placeholder="State" />
            <input name="country" value={formData.country} onChange={handleChange} className="form-input" placeholder="Country" />
            <input name="Company" value={formData.Company} onChange={handleChange} className="form-input" placeholder="Company" />
            <input name="bussinessAddress" value={formData.bussinessAddress} onChange={handleChange} className="form-input" placeholder="Business Address *" required />
          </div>

          {/* Business Info */}
          <h3 className="h3-class-css">Business information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mb-8">
            <input name="bussinessNature" value={formData.bussinessNature} onChange={handleChange} className="form-input" placeholder="Current Nature of Business" />
            <input name="experienceInCurrentBussiness" value={formData.experienceInCurrentBussiness} onChange={handleChange} className="form-input" placeholder="Experience in Current Business" />
            <input name="BussinessType" value={formData.BussinessType} onChange={handleChange} className="form-input" placeholder="Business Type" />
            <input name="annualRevenue" value={formData.annualRevenue} onChange={handleChange} className="form-input" placeholder="Annual Revenue" />
            <input name="BusinessBrief" value={formData.BusinessBrief} onChange={handleChange} className="form-input" placeholder="Business Brief" />
            <input name="infrastructure" value={formData.infrastructure} onChange={handleChange} className="form-input" placeholder="Infrastructure" />
            <input name="vehicle" value={formData.vehicle} onChange={handleChange} className="form-input" placeholder="Vehicle" />
            <input name="interestReason" value={formData.interestReason} onChange={handleChange} className="form-input" placeholder="Why are you interested?" />
          </div>
        </div>

        <div className="flex justify-center mt-9">
          <button
            type="submit"
            className="bg-indigo-800 text-white px-6 sm:px-8 py-2 rounded-md text-sm font-semibold hover:bg-indigo-900 transition"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </form>
  );
};

export default EnquiryForm;
