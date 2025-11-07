"use client";
import React, { useEffect, useState, useCallback } from "react";
import { fetchAllSalespersons } from "@/app/store/Actions/salespersonAction";
import { fetchsalespersonwiseattendance } from "@/app/store/Actions/attendanceAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AllSalespersonAttendance = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [salespersons, setSalespersons] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSalespersonsData = async () => {
      setLoading(true);
      try {
        const result = await dispatch(fetchAllSalespersons());
        if (result?.salesperson?.length) {
          setSalespersons(result.salesperson);
        } else {
          toast.info("No salespersons found.");
        }
      } catch (error) {
        toast.error("Failed to fetch salespersons.");
        console.error("Error fetching salespersons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSalespersonsData();
  }, [dispatch]);

  const handleSelect = useCallback(
    async (salesperson) => {
      setIsOpen(false);
      try {
        await dispatch(fetchsalespersonwiseattendance({ id: salesperson.id }));
        toast.success(`Attendance loaded for ${salesperson.name}`);
      } catch (error) {
        toast.error("Failed to fetch attendance.");
        console.error(error);
      }
    },
    [dispatch]
  );

  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <div className="p-6">
      <div className="relative inline-block text-left">
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {loading ? "Loading..." : "Select Salesperson"}
        </button>

        {isOpen && !loading && (
          <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1 max-h-60 overflow-y-auto">
              {salespersons.length > 0 ? (
                salespersons.map((sp) => (
                  <button
                    key={sp.id}
                    onClick={() => handleSelect(sp)}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    {sp.name}
                  </button>
                ))
              ) : (
                <p className="px-4 py-2 text-sm text-gray-500">
                  No salesperson found
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSalespersonAttendance;
