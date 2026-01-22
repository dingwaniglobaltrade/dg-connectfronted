import React from "react";

const benifits = () => {
  return (
    <div className="bg-white w-full flex flex-col lg:gap-10 md:gap-7 sm:gap-4 gap-4 justify-center text-center items-center py-5 px-4 lg:px-10 md:px-10">
      <h1 className="text-[20px] bg-primary px-4 font-light text-white py-2 rounded-[10px]">
        What are your benifits of being a
      </h1>
      <div
        className="flex lg:flex-row md:flex-row sm:flex-col flex-col w-full lg:justify-between
      md:justify-between sm:justify-center justify-center gap-8"
      >
        <div className="flex flex-col lg:w-[45%] md:w-[55%] sm:w-[98%] w-[98%] px-2">
          <h1 className="text-[#EE7906] uppercase font-medium text-[18px] mb-5">
            dingwani foods distributors
          </h1>
          <div className="bg-[#ED7A031A] rounded-[30px] px-7 py-3 shadow-md cursor-pointer">
            <div className="lg:px-10 md:px-8 sm:px-7 py-4 text-left text-[#818080]">
              <li className="mb-1">Direct access to Dingwani Foods</li>
              <li className="mb-1">Faster order processing & visibility </li>
              <li className="mb-1">
                Real-time schemes, pricing & product updates
              </li>
              <li className="mb-1">Streamlined communication & reporting</li>
              <li>Stronger alignment with brand goals</li>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:w-[45%] md:w-[55%] sm:w-[98%] w-[98%] px-2">
          <h1 className="text-[#EE7906] uppercase font-medium text-[18px] mb-5">
            dingwani foods retailers
          </h1>
          <div className="bg-[#ED7A031A] rounded-[30px] px-7 py-3 shadow-md cursor-pointer">
            <div className="lg:px-10 md:px-8 sm:px-7  py-4 text-left text-[#818080]">
              <li className="mb-1">
                Easy ordering from authorized distributors
              </li>
              <li className="mb-1">Access to exclusive offers & benefits</li>
              <li className="mb-1">Product availability & launch updates</li>
              <li className="mb-1"> Loyalty-driven incentives</li>
              <li> Consistent brand experience</li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default benifits;
