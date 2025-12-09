"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";

// Actions (replace with your real update actions)
import {
  fetchRetailerbyID,
  editRetailerdetailes,
} from "@/app/store/Actions/retailerAction";
import {
  fetchDistributorbyID,
  editDistributordetailes,
} from "@/app/store/Actions/distributorAction";
import {
  fetchSalespersonsDetailesbyID,
  updateSalespersonDetailes,
} from "@/app/store/Actions/salespersonAction";

// Components
import ProfileHeader from "./ProfileHeader";
import InfoSection from "./infodaynamic";

// Field configuration
const userFieldConfig = {
  retailer: {
    personalInfo: [
      { label: "Firm Name", key: "shopName" },
      { label: "Concern Person Name", key: "name" },
      { label: "GSTIN Number", key: "gstn" },
      { label: "Route Name", key: "retailerRoute.routeName" },
      { label: "Assigned Distributor Name", key: "assignedDistributorName" },
    ],
    contactInfo: [
      { label: "Email Address", key: "email" },
      { label: "Mobile Number", key: "mobile" },
      { label: "Address", key: "address.complectAddress" },
    ],
  },
  distributor: {
    personalInfo: [
      { label: "Company Name", key: "firmName" },
      { label: "Owner Name", key: "name" },
      { label: "GSTIN Number", key: "gstn" },
      { label: "Region Covered", key: "routes.routeName" },
    ],
    contactInfo: [
      { label: "Email Address", key: "email" },
      { label: "Phone Number", key: "mobile" },
      { label: "Office Address", key: "address" },
    ],
  },
  salesperson: {
    personalInfo: [
      { label: "Full Name", key: "name" },
      { label: "Employee ID", key: "employeeId" },
    ],
    contactInfo: [
      { label: "Email Address", key: "email" },
      { label: "Phone Number", key: "mobile" },
    ],
  },
};

export default function DaynamicDetailesPage() {
  const { userId: id, userType } = useParams();
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user details
  useEffect(() => {
    if (!id || !userType) return;

    const fetchData = async () => {
      let res;
      if (userType === "retailer") {
        res = await dispatch(fetchRetailerbyID(id));
      } else if (userType === "distributor") {
        res = await dispatch(fetchDistributorbyID(id));
      } else if (userType === "salesperson") {
        res = await dispatch(fetchSalespersonsDetailesbyID(id));
      }
      const data = res.payload || res;
      setUserDetails(data);
      setFormData(data); // prefill edit form
    };

    fetchData();
  }, [id, userType, dispatch]);

  const handleSave = async () => {
    try {
      if (userType === "retailer") {
        await dispatch(editRetailerdetailes(id, formData));
      } else if (userType === "distributor") {
        await dispatch(editDistributordetailes(id, formData));
      } else if (userType === "salesperson") {
        await dispatch(updateSalespersonDetailes(id, formData));
      }
      setUserDetails(formData);
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };


  if (!userDetails) return <p className="p-4">Loading...</p>;

  return (
    <div className="h-full w-full bg-[#f8f9fa] px-4 py-6 flex flex-col items-center">
      <div className="w-[98%] bg-white rounded-xl px-8 pb-10">
        <ProfileHeader
          userDetails={userDetails}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleSave={handleSave}
          setFormData={setFormData}
          formData={formData}
        />

        <InfoSection
          title="Personal Information"
          fields={userFieldConfig[userType].personalInfo}
          userDetails={formData}
          isEditing={isEditing}
          setFormData={setFormData}
        />

        <InfoSection
          title="Contact Information"
          fields={userFieldConfig[userType].contactInfo}
          userDetails={formData}
          isEditing={isEditing}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}
