"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllSalespersons } from "@/app/store/Actions/salespersonAction";
import {
  asyncfetchroute,
  AssignRoutetoSalesperson,
} from "@/app/store/Actions/routeAction";
import { AssignSalespersonToDistributor } from "@/app/store/Actions/distributorAction";
import closeIcon from "@/icons/form/close.svg";
import { toast } from "react-toastify";
import Image from "next/image";

const AssignModal = ({ distributor, onClose, mode }) => {
  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Fetch data depending on mode
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (mode === "salesperson") {
          const result = await dispatch(fetchAllSalespersons());
          if (result?.salesperson && Array.isArray(result.salesperson)) {
            setItems(result.salesperson);
          }
        } else if (mode === "route") {
          const result = await dispatch(asyncfetchroute());
          if (result?.routes && Array.isArray(result.routes)) {
            setItems(result.routes);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dispatch, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    if (selectedIds.length === 0) {
      toast.error(`Please select at least one ${mode}`);
      return;
    }

    try {
      let result;
      if (mode === "salesperson") {
        result = await dispatch(
          AssignSalespersonToDistributor(distributor.id, selectedIds)
        );
      } else if (mode === "route") {
        result = await dispatch(
          AssignRoutetoSalesperson(distributor.id, selectedIds)
        );
      }

      if (result?.success) {
        toast.success(`${mode} assigned successfully`);
        onClose();
      } else {
        toast.error(`Failed to assign ${mode}(s)`);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="rounded-[16px] bg-white w-full max-w-md py-5 shadow-lg overflow-y-auto">
        <div className="w-full bg-primary rounded-t-xl flex px-4 items-center justify-between">
          <h2 className="text-[15px] font-semibold text-white py-3">
            {mode === "salesperson" ? "Assign Salesperson" : "Assign Route"}
          </h2>
          <button
            onClick={onClose}
            className="bg-white px-[2px] py-[2px] rounded-full"
          >
            <Image src={closeIcon} alt="close icon" height={20} width={20} />
          </button>
        </div>

        <div className="px-4 mt-4">
          <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded">
            <div className="max-h-[300px] min-h-[100px] overflow-y-auto flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={item.id}
                    checked={selectedIds.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="w-4 h-4"
                  />
                  <span>{item.name || item.routeName}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 sticky bottom-0 py-2">
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
                className={`bg-primary text-[12px] text-white mt-4 px-6 py-2 rounded
    ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"}
  `}
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

export default AssignModal;
