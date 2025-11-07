"use client";
import React, { useState } from "react";

const Dropdown = () => {
const [selectedOption, setSelectedOption] = useState("");

const handleChange = (event) => {
  setSelectedOption(event.target.value);
};

return (
  <div className="lg:w-[110px] md:w-[110px] w-[80px] text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]">
  <label htmlFor="dropdown" className="sr-only">
    Select Time Period
  </label>
  <select
    id="dropdown"
    value={selectedOption}
    onChange={handleChange}
    className="w-full px-3 py-1.5 rounded-md bg-[#F6F8FA] border border-[#C0C1C2] focus:outline-none focus:ring-2 focus:ring-[#2F80ED]"
  >
    <option value="">Select</option>
    <option value="option1">Week</option>
    <option value="option2">Month</option>
    <option value="option3">Year</option>
  </select>
</div>
  );
};

export default Dropdown;
