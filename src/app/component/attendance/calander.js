"use client";

import React, { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";

import Calendar from "@/icons/attendance/calander.svg";
import Clock from "@/icons/attendance/clock.svg";

export default function DatePickerComponent({ setAttendancedate }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Format date to YYYY-MM-DD only
  const pad = (n) => n.toString().padStart(2, "0");

  const formatDateForAPI = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    return `${year}-${month}-${day}`; // ✅ only date
  };

  // Set default date on initial mount
  useEffect(() => {
    const todayFormatted = formatDateForAPI(selectedDate);
    setAttendancedate(todayFormatted);
  }, []);

  // Custom input for calendar icon + label
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div
      onClick={onClick}
      ref={ref}
      className="flex items-center gap-4 cursor-pointer pt-2"
    >
      <Image src={Calendar} alt="calendar" height={21} width={21} />
      <span className="text-[#1D2433] text-[13px] text-nowrap">
        {value || "Select date"}
      </span>
    </div>
  ));

  return (
    <div className="flex gap-8 items-center">
      {/* Calendar Picker */}
      <div className="flex items-center pr-[2px]">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            const formatted = formatDateForAPI(date);
            setAttendancedate(formatted); // ✅ only date saved
          }}
          dateFormat="MMMM d, yyyy" // ✅ hide time
          customInput={<CustomInput />}
        />
      </div>

      {/* Static Time Info */}
      <div className="lg:flex md:flex hidden items-center gap-4 border-l-[2px] border-l-[#DCDCDD] pl-4">
        <Image src={Clock} alt="clock" height={21} width={21} />
        <div className="text-[#1D2433] text-[13px]">10AM to 7PM</div>
      </div>
    </div>
  );
}
