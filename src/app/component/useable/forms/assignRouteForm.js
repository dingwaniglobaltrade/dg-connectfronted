"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AssignRoutetoSalesperson } from "@/app/store/Actions/routeAction";
import { asyncfetchroute } from "@/app/store/Actions/routeAction";
import closeIcon from "@/icons/form/close.svg";
import { toast } from "react-toastify";
import Image from "next/image";

const AssignRouteForm = ({ staff, onClose }) => {
  const [routes, setRoutes] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState("");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const result = await dispatch(asyncfetchroute());
        if (result?.routes) {
          setRoutes(result.routes);
        }
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (isLoading) return;

  setIsLoading(true);
    if (!selectedRouteId) {
      toast.error("Please select a route");
      return;
    }

    try {
      const result = await dispatch(
        AssignRoutetoSalesperson(staff.id, selectedRouteId)
      );

      if (result?.success) {
        toast.success("Route assigned successfully");
        onClose();
      } else {
        toast.error("Failed to assign route");
         setIsLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="rounded-[16px] bg-white w-full max-w-md py-5 shadow-lg">
        <div className="w-full bg-primary rounded-t-xl flex px-4 items-center justify-between">
          <h2 className="text-[15px] font-semibold text-white py-3">
            Assign Route to {staff?.name}
          </h2>
          <button
            onClick={onClose}
            className="bg-white px-[2px] py-[2px] rounded-full"
          >
            <Image src={closeIcon} alt="close icon" height={20} width={20} />
          </button>
        </div>

        <div className="px-4 mt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              let foundRouteId = selectedRouteId;

              // ✅ If nothing selected yet, try to find from routes list
              if (!foundRouteId && routes.length > 0) {
                const found = routes.find((r) => r?.id || r?.routeId);

                if (found) {
                  foundRouteId = found.id || found.routeId;
                  setSelectedRouteId(foundRouteId);
                }
              }

              // ✅ If still nothing found, show error
              if (!foundRouteId) {
                alert("No routes found. Please add a route first.");
                return;
              }

              // ✅ Call your submit logic with the found route ID
              handleSubmit(e, foundRouteId);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block font-medium mb-2 text-[12px]">
                Select Route
              </label>
              <select
                className="w-full text-black border px-3 py-1.5 rounded text-[12px]"
                value={selectedRouteId}
                onChange={(e) => setSelectedRouteId(e.target.value)}
              >
                <option value="">-- Select Route --</option>
                {routes.length > 0 ? (
                  routes.map((route) =>
                    (route?.id || route?.routeId) && route?.routeName ? (
                      <option
                        key={route.id || route.routeId}
                        value={route.id || route.routeId}
                      >
                        {route.routeName}
                      </option>
                    ) : null
                  )
                ) : (
                  <option disabled>Loading routes...</option>
                )}
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-[12px] text-white mt-4 px-6 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-[12px] text-white mt-4 px-6 py-2 rounded"
              >
                {isLoading ? "Assigning..." : "Assign"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignRouteForm;
