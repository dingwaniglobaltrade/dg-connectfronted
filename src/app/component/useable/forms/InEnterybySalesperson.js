"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CameraCapture from "@/app/component/salesperson/CameraCapture";
import LocationFetcher from "@/app/component/salesperson/LocationFetcher";
import { InEnteryOFSalespersom } from "@/app/store/Actions/attendanceAction";

const InEnterybySalesperson = () => {
  const dispatch = useDispatch();

  const [InEnteryDataForm, setInEnteryDataForm] = useState({
    InTimeImage: "",
    InTimeLatitude: "",
    InTimeLongitude: "",
  });

  const [liveAddress, setLiveAddress] = useState("");

  // Handle lat/lng update
  const handleLocation = ({ InTimeLatitude, InTimeLongitude }) => {
    setInEnteryDataForm((prev) => ({
      ...prev,
      InTimeLatitude,
      InTimeLongitude,
    }));
  };

  // Handle human-readable address update
  const handleAddress = (address) => {
    setLiveAddress(address);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(InEnteryOFSalespersom(InEnteryDataForm));

      if (result?.success) {
        toast.success("Attendance submitted successfully!");
      } else {
        toast.warn(result?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      toast.error("An error occurred while submitting attendance.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <div className="flex lg;flex-row md:flex-row flex-col text-[12px] items-center lg:justify-evenly md:justify-evenly justify-start pb-5 mb-2">
            {/* Location */}
            <div className="flex flex-row gap-2">
              <div className="flex flex-col">
                <label className="text-texthearder font-semibold">
                  In Location
                </label>
                <input
                  type="text"
                  name="livelocation"
                  value={liveAddress}
                  readOnly
                  className="py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
                />
              </div>
              <LocationFetcher
                onLocation={handleLocation}
                onAddress={handleAddress}
              />
            </div>

            {/* Camera */}
            <div>
              <label className="text-texthearder font-semibold mt-5">
                Capture Image
              </label>
              <CameraCapture
                onCapture={(img) =>
                  setInEnteryDataForm((prev) => ({ ...prev, InTimeImage: img }))
                }
              />
            </div>

             <div className="flex items-end mt-4">
            <button
              type="submit"
              className="bg-primary text-[12px] text-white mt-4 px-6 py-2 mb-4 rounded"
            >
              Add Attendance
            </button>
          </div>
          </div>
      </form>
    </div>
  );
};

export default InEnterybySalesperson;
