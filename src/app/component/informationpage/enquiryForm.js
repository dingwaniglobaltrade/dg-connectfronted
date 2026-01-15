import React from "react";

const enquiryForm = () => {
  return (
    <div className="lg:px-[120px] md:px-[100px] sm:px-5 px-5 flex flex-col gap-8 mt-8  ">
      <div className="w-full bg-[#ED7A031A] px-4 sm:px-8 lg:px-24 py-16 rounded-[20px]">
        <div className="flex flex-col items-center">
          <h1 className=" font-bold text-2xl sm:text-3xl lg:text-4xl">
            LET’S TEAM UP
          </h1>
        </div>
        <div className="mt-10">
          <h3 className="h3-class-css">Personal information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mb-8">
            <input className="form-input" placeholder="First Name *" />
            <input className="form-input" placeholder="Last Name *" />
            <input className="form-input" placeholder="Age" />
            <input className="form-input" placeholder="Qualification" />
          </div>
          <h3 className="h3-class-css">Contact information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mb-8">
            <input className="form-input" placeholder="Phone *" />
            <input className="form-input" placeholder="Email *" />
            <input className="form-input" placeholder="City" />
            <input className="form-input" placeholder="Zip" />
            <input className="form-input" placeholder="State" />
            <input className="form-input" placeholder="Country" />
            <input className="form-input" placeholder="Company" />
            <input className="form-input" placeholder="Business Address" />
          </div>

          <h3 className="h3-class-css">Bussiness information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mb-8">
            <input
              className="form-input"
              placeholder="Current Nature of Business"
            />
            <input
              className="form-input"
              placeholder="Experience in Current Business (Years)"
            />
            <input className="form-input" placeholder="Business Type" />
            <input className="form-input" placeholder="Annual Revenue" />
            <input
              className="form-input"
              placeholder="Current Business Brief"
            />
            <input className="form-input" placeholder="Infrastructure" />
            <input className="form-input" placeholder="Vehicle" />
            <input
              className="form-input"
              placeholder="Why are you interested?"
            />
          </div>
        </div>

        <div className="flex justify-center mt-9">
          <button className="bg-indigo-800 text-white px-6 sm:px-8 py-2 rounded-md text-xs sm:text-sm font-semibold hover:bg-indigo-900 transition">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default enquiryForm;
