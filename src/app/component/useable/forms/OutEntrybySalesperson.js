"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CameraCapture from "@/app/component/salesperson/CameraCapture";
import LocationFetcher from "@/app/component/salesperson/LocationFetcher";
import { logOutEnteryOFSalespersom } from "@/app/store/Actions/attendanceAction";

const OutEntrybySalesperson = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [OutEnteryDataForm, setOutEnteryDataForm] = useState({
    OutTimeImage: "",
    OutTimeLatitude: "",
    OutTimeLongitude: "",
  });

  const [liveAddress, setLiveAddress] = useState("");

  // Handle lat/lng update
  const handleLocation = ({ latitude, longitude }) => {
    setOutEnteryDataForm((prev) => ({
      ...prev,
      OutTimeLatitude: latitude,
      OutTimeLongitude: longitude,
    }));
  };

  // Handle human-readable address update
  const handleAddress = (address) => {
    setLiveAddress(address);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("OutTimeImage", OutEnteryDataForm.OutTimeImage);
      formData.append("OutTimeLatitude", OutEnteryDataForm.OutTimeLatitude);
      formData.append("OutTimeLongitude", OutEnteryDataForm.OutTimeLongitude);
      console.log({ formData });

      const result = await dispatch(logOutEnteryOFSalespersom(formData));

      if (result?.success) {
        if (onSubmit) onSubmit();
        toast.success("Attendance submitted successfully!");
      } else {
        toast.warn(result?.message || "Something went wrong");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      toast.error("An error occurred while submitting attendance.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 lg;flex-row md:flex-row flex-col text-[12px] items-center lg:justify-evenly md:justify-evenly justify-start pb-5 mb-2">
          {/* Location */}
          <div className="flex flex-row gap-2">
            <div>
              <label className="text-texthearder font-semibold">
                Out Location
              </label>
              <input
                type="text"
                name="livelocation"
                value={liveAddress}
                required
                readOnly
                className="w-full py-1.5 rounded px-2 mt-1 text-black border border-grey-200"
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
              required
              onCapture={(img) =>
                setOutEnteryDataForm((prev) => ({ ...prev, OutTimeImage: img }))
              }
            />
          </div>

          <div className="flex items-end mt-4">
            <button
              disabled={isLoading}
              type="submit"
              className={`bg-primary text-[12px] text-white mt-4 px-6 py-2 mb-4 rounded
    ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"}
  `}
            >
              {isLoading ? "Updating..." : "Out Attendance"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OutEntrybySalesperson;
