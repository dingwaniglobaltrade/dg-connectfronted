"use client";
import React, { useEffect, useState } from "react";
import { fetchAllSalespersons } from "@/app/store/Actions/salespersonAction";
import {
  CreateAttendaneAction,
  editattendancedetailes,
} from "@/app/store/Actions/attendanceAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AttendanceForm = ({ initialData = {}, isEditMode = false }) => {
  const [salespersons, setSalespersons] = useState([]);
  const dispatch = useDispatch();

  const [salespersonForm, setSalespersonForm] = useState({
    SalespersonID: "",
    InTime: "",
    OutTime: "",
    attendanceStatus: "",
  });

  // Fetch salespersons on mount
  useEffect(() => {
    const fetchSalespersonsData = async () => {
      try {
        const result = await dispatch(fetchAllSalespersons());
        if (result?.salesperson) {
          setSalespersons(result.salesperson);
        }
      } catch (error) {
        console.error("Error fetching salespersons:", error);
      }
    };
    fetchSalespersonsData();
  }, [dispatch]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalespersonForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (initialData) {
      const sanitized = Object.fromEntries(
        Object.entries(initialData).map(([key, val]) => [key, val ?? ""])
      );
      setSalespersonForm((prev) => ({ ...prev, ...sanitized }));
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatDateTime = (datetimeValue) => {
      if (!datetimeValue) return "";
      const date = new Date(datetimeValue);
      const pad = (n) => n.toString().padStart(2, "0");

      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const formattedForm = {
      ...salespersonForm,
      InTime: formatDateTime(salespersonForm.InTime),
      OutTime: formatDateTime(salespersonForm.OutTime),
    };

    try {
      let result;

      if (!initialData) {
        // Create Mode
        console.log("Creating Attendance with:");
        result = await dispatch(
          CreateAttendaneAction({
            id: salespersonForm.SalespersonID,
            salespersonForm: formattedForm,
          })
        );
      } else {
        // Edit Mode
        console.log("Editing Attendance with:");
        
        result = await dispatch(
          editattendancedetailes(formattedForm.id, formattedForm)
        );  
      }

      if (result?.success) {
        toast.success(
          `Attendance ${initialData ? "updated" : "submitted"} successfully!`
        );

        if (!initialData) {
          setSalespersonForm({
            SalespersonID: "",
            InTime: "",
            OutTime: "",
            attendanceStatus: "",
          });
        }

        // You can refresh the list if needed here
        // dispatch(fetchAttendanceList());
      } else {
        toast.warn(result?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      toast.error("An error occurred while submitting attendance.");
    }
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formatDateTime = (datetimeValue) => {
  //     if (!datetimeValue) return "";
  //     const date = new Date(datetimeValue);
  //     const pad = (n) => n.toString().padStart(2, "0");

  //     const year = date.getFullYear();
  //     const month = pad(date.getMonth() + 1);
  //     const day = pad(date.getDate());
  //     const hours = pad(date.getHours());
  //     const minutes = pad(date.getMinutes());
  //     const seconds = pad(date.getSeconds());

  //     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  //   };

  //   const formattedForm = {
  //     ...salespersonForm,
  //     InTime: formatDateTime(salespersonForm.InTime),
  //     OutTime: formatDateTime(salespersonForm.OutTime),
  //   };

  //   try {
  //     const result = await dispatch(
  //       CreateAttendaneAction({
  //         id: salespersonForm.SalespersonID,
  //         salespersonForm: formattedForm,
  //       })
  //     );

  //     if (result?.success) {
  //       toast.success("Attendance submitted successfully!");
  //       setSalespersonForm({
  //         SalespersonID: "",
  //         InTime: "",
  //         OutTime: "",
  //         attendanceStatus: "",
  //       });
  //     } else {
  //       toast.alert("Failed to submit attendance.");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting attendance:", error);
  //     toast.error("Something went wrong while submitting attendance.");
  //   }
  // };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-1 grid-cols-1">
          <div className="grid grid-cols-2 gap-4 text-[12px] mt-2">
            <div>
              <label className="text-texthearder font-semibold">
                Salesperson Name
              </label>
              <select
                className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
                name="SalespersonID"
                value={salespersonForm.SalespersonID || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Salesperson</option>
                {salespersons.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-texthearder font-semibold">
                Attendance Status
              </label>
              <select
                className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
                name="attendanceStatus"
                value={salespersonForm.attendanceStatus || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="AL">AL</option>
                <option value="PL">PL</option>
                <option value="UL">UL</option>
                <option value="WO">WO</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-[12px] mt-2">
            <div>
              <label className="text-texthearder font-semibold">In Time</label>
              <input
                className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
                type="datetime-local"
                name="InTime"
                value={salespersonForm.InTime || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-texthearder font-semibold">Out Time</label>
              <input
                className="w-full py-1.5 rounded px-2 mt-1 text-black border-grey-200 border-[1px]"
                type="datetime-local"
                name="OutTime"
                value={salespersonForm.OutTime || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end w-full">
          <button
            type="submit"
            className="bg-primary text-[12px] text-white mt-4 px-6 py-2 mb-4 rounded"
          >
            {initialData ? "Update Attendance" : "Add Attendance"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttendanceForm;
