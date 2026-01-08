"use client";
import React, { useEffect, useState } from "react";
import {
  createRoute,
  editExistingRoutes,
  asyncfetchroute,
} from "@/app/store/Actions/routeAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const RouteForm = ({ initialData = {}, isEditMode = false, onSubmit }) => {
  // console.log({ isEditMode });
  const [route, setRoute] = useState({
    routeName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialData) {
      const sanitized = Object.fromEntries(
        Object.entries(initialData).map(([key, val]) => [key, val ?? ""])
      );
      setRoute((prev) => ({ ...prev, ...sanitized }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoute((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      let result;
      if (initialData) {
        const updatedFields = {};
        Object.keys(route).forEach((key) => {
          if (route[key] !== initialData[key]) {
            updatedFields[key] = route[key];
          }
        });

        // 2. Dispatch update only with changed fields
        result = await dispatch(
          editExistingRoutes(route.routeId, updatedFields)
        );
      } else {
        // Creating new product
        result = await dispatch(createRoute(route));
      }

      if (result.success) {
        if (onSubmit) onSubmit();
        toast.success(
          `Route ${initialData ? "updated" : "created"} successfully!`
        );

        if (!initialData) {
          setRoute({
            routeName: "",
          });
        }
        dispatch(asyncfetchroute());
      } else {
        toast.warn(result.message || "Something went wrong");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Route Submit Error:", err);
      toast.error("An error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-1 grid-cols-1">
        <div className="grid grid-cols-1 gap-4 text-[12px] mt-2">
          <div>
            <label className="text-texthearder font-semibold">Route Name</label>
            <input
              className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
              type="text"
              name="routeName"
              value={route.routeName || ""}
              onChange={handleChange}
              placeholder="Enter route name"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end w-full">
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-primary text-[12px] text-white mt-4 px-6 py-2 mb-4 rounded
    ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"}
  `}
        >
          {isLoading
            ? initialData
              ? "Updating..."
              : "Creating..."
            : initialData
            ? "Update Route"
            : "Create Route"}
        </button>
      </div>
    </form>
  );
};

export default RouteForm;
