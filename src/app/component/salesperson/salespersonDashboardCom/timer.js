"use client";

import React, { useState, useEffect } from "react";
import InEntryForm from "@/app/component/useable/forms/InEnterybySalesperson";
import OutEntryForm from "@/app/component/useable/forms/OutEntrybySalesperson";

const AttendanceTimer = () => {
  const [time, setTime] = useState(0); // total seconds
  const [isRunning, setIsRunning] = useState(false);
  const [activeForm, setActiveForm] = useState(null); // null | "in" | "out"

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleCheckIn = () => {
    setActiveForm("in"); // show InEntryForm
  };

  const handleCheckOut = () => {
    setActiveForm("out"); // show OutEntryForm
    setIsRunning(false);
  };

  // Called when InEntryForm is successfully submitted
  const onInEntrySubmit = () => {
    setActiveForm(null); // close form
    setIsRunning(true);  // start timer
    setTime(0);          // reset timer
  };

  // Format time into HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="bg-[#1768B9] text-white p-6 sm:p-10 rounded-lg shadow-lg w-full text-center">
      <h3 className="font-bold mb-2">
        Today's Summary{" "}
        <span className="font-normal">You have "Full time schedule" today</span>
      </h3>

      <h1 className="text-4xl font-bold my-4">{formatTime(time)} Hrs</h1>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mb-6 text-[12px]">
        <button
          onClick={handleCheckIn}
          disabled={isRunning}
          className={`px-4 py-2 rounded-lg font-semibold ${
            isRunning ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
          }`}
        >
          Check In
        </button>

        <button
          onClick={handleCheckOut}
          disabled={!isRunning}
          className={`px-4 py-2 rounded-lg font-semibold ${
            !isRunning ? "bg-gray-400 cursor-not-allowed" : "bg-[#FA5A7D]"
          }`}
        >
          Check Out
        </button>
      </div>

      {/* Conditional Form Rendering */}
      <div className="mb-4">
        {activeForm === "in" && <InEntryForm onSubmit={onInEntrySubmit} />}
        {activeForm === "out" && <OutEntryForm onClose={() => setActiveForm(null)} />}
      </div>

      <div className="flex justify-between text-sm border-t-[1px] border-white pt-2">
        <div>
          <p>Check In</p>
          <p className="font-bold">10:00 AM</p>
        </div>
        <div>
          <p>Check Out</p>
          <p className="font-bold">06:00 PM</p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTimer;
