"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import S3Image from "@/app/component/useable/S3Image";
// Actions
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

/**
 * ===============================
 * FIELD CONFIG WITH VISIBILITY
 * ===============================
 */
const userFieldConfig = {
  retailer: {
    personalInfo: [
      {
        label: "Firm Name",
        key: "shopName",
        visibleTo: ["admin", "subadmin", "retailer"],
      },
      {
        label: "Concern Person Name",
        key: "name",
        visibleTo: ["admin", "subadmin", "retailer"],
      },
      {
        label: "GSTIN Number",
        key: "gstn",
        visibleTo: ["admin", "subadmin"],
      },
      {
        label: "Route Name",
        key: "retailerRoute.routeName",
        visibleTo: ["admin", "subadmin", "retailer"],
      },
      {
        label: "Assigned Distributor Name",
        key: "Distributordetailes.firmName",
        visibleTo: ["admin", "subadmin", "retailer"],
      },
      {
        label: "Total Lifetime Order Value",
        key: "totalOrderValue",
        visibleTo: ["admin", "subadmin"],
      },
      {
        label: "Order Value (Current Month)",
        key: "currentMonthOrderValue",
        visibleTo: ["admin", "subadmin"],
      },
    ],
    contactInfo: [
      {
        label: "Email Address",
        key: "email",
        visibleTo: ["admin", "subadmin", "retailer"],
      },
      {
        label: "Mobile Number",
        key: "mobile",
        visibleTo: ["admin", "subadmin", "retailer"],
      },
      {
        label: "Address",
        key: "address",
        visibleTo: ["admin", "subadmin", "retailer"],
      },
    ],
  },

  distributor: {
    personalInfo: [
      {
        label: "Company Name",
        key: "firmName",
        visibleTo: ["admin", "subadmin", "distributor"],
      },
      {
        label: "Owner Name",
        key: "name",
        visibleTo: ["admin", "subadmin", "distributor"],
      },
      {
        label: "GSTIN Number",
        key: "gstn",
        visibleTo: ["admin", "subadmin", "distributor"],
      },
      {
        label: "Region Covered",
        key: "routes.routeName",
        visibleTo: ["admin", "subadmin", "distributor"],
      },
      {
        label: "All-Time Orders",
        key: "totalOrderValue",
        visibleTo: ["admin", "subadmin"],
      },
      {
        label: "Monthly Orders",
        key: "currentMonthOrderValue",
        visibleTo: ["admin", "subadmin"],
      },
    ],
    contactInfo: [
      {
        label: "Email Address",
        key: "email",
        visibleTo: ["admin", "subadmin", "distributor"],
      },
      {
        label: "Phone Number",
        key: "mobile",
        visibleTo: ["admin", "subadmin", "distributor"],
      },
      {
        label: "Office Address",
        key: "address",
        visibleTo: ["admin", "subadmin", "distributor"],
      },
    ],
  },

  salesperson: {
    personalInfo: [
      {
        label: "Full Name",
        key: "name",
        visibleTo: ["admin", "subadmin", "salesperson"],
      },
      {
        label: "Employee ID",
        key: "employeeId",
        visibleTo: ["admin", "subadmin"],
      },
      {
        label: "Assigned Route",
        key: "salespersonRoute.routeName",
        visibleTo: ["admin", "subadmin", "salesperson"],
      },
      {
        label: "Total Order Value (All Time)",
        key: "totalOrderValue",
        visibleTo: ["admin", "subadmin"],
      },
      {
        label: "Current Month Order Value",
        key: "currentMonthOrderValue",
        visibleTo: ["admin", "subadmin", "salesperson"],
      },
    ],
    contactInfo: [
      {
        label: "Email Address",
        key: "email",
        visibleTo: ["admin", "subadmin", "salesperson"],
      },
      {
        label: "Phone Number",
        key: "mobile",
        visibleTo: ["admin", "subadmin", "salesperson"],
      },
    ],
  },
};

/**
 * ===============================
 * FIELD FILTER HELPER
 * ===============================
 */
const filterFieldsByUserType = (fields, userType) => {
  return fields.filter(
    (field) =>
      !field.visibleTo || field.visibleTo.includes(userType)
  );
};

export default function DaynamicDetailesPage() {
  const { userId: id, userType } = useParams();
  const dispatch = useDispatch();

  /**
   * Logged-in user details
   */
  const loginState = useSelector((state) => state.login);
  const UserType = loginState?.admin?.userType; // admin | subadmin | retailer ...

  const [userDetails, setUserDetails] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  /**
   * ===============================
   * FETCH USER DETAILS
   * ===============================
   */
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

      const data = res?.payload || res;
      setUserDetails(data);
      setFormData(data);
    };

    fetchData();
  }, [id, userType, dispatch]);

  /**
   * ===============================
   * SAVE HANDLER
   * ===============================
   */
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
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (!userDetails) return <p className="p-4">Loading...</p>;

  const canEdit = ["admin", "subadmin"].includes(UserType);

  return (
    <div className="h-full w-full bg-[#f8f9fa] px-4 py-6 flex flex-col items-center">
      <div className="w-[98%] bg-white rounded-xl px-8 pb-10">
        <ProfileHeader
          userDetails={userDetails}
          isEditing={isEditing && canEdit}
          setIsEditing={setIsEditing}
          handleSave={handleSave}
          setFormData={setFormData}
          formData={formData}
        />

        <InfoSection
          title="Personal Information"
          fields={filterFieldsByUserType(
            userFieldConfig[userType].personalInfo,
            UserType
          )}
          userDetails={formData}
          isEditing={isEditing && canEdit}
          setFormData={setFormData}
        />

        <InfoSection
          title="Contact Information"
          fields={filterFieldsByUserType(
            userFieldConfig[userType].contactInfo,
            UserType
          )}
          userDetails={formData}
          isEditing={isEditing && canEdit}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}
