"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchIcon from "@/icons/search.svg";
import Modal from "@/app/component/useable/modle";
import ProductForm from "@/app/component/useable/forms/productcreate";
import AttendanceForm from "@/app/component/useable/forms/addAttendance";
import RetailerForm from "@/app/component/useable/forms/retailercreate";
import AddStaffForm from "@/app/component/useable/forms/addStaff";
import AddRouteForm from "@/app/component/useable/forms/routeadd";
import AddStockForm from "@/app/component/useable/forms/stockForm";
import DistributorForm from "@/app/component/useable/forms/adddistributorForm";
import AddTravelExpense from "@/app/component/useable/forms/addExpense";
import AddOtherExpenses from "@/app/component/useable/forms/addOtherExpense";
import InEntryForm from "@/app/component/useable/forms/InEnterybySalesperson";
import OutEntryForm from "@/app/component/useable/forms/OutEntrybySalesperson";
import AddOrderForm from "@/app/component/useable/forms/AddordercreateforRetailer";
import AddOrderForDistributor from "@/app/component/useable/forms/addOrderforDistributor";

const formComponents = {
  product: ProductForm,
  attendance: AttendanceForm,
  retailer: RetailerForm,
  staff: AddStaffForm,
  route: AddRouteForm,
  stock: AddStockForm,
  distributor: DistributorForm,
  expense: AddTravelExpense,
  claim: AddOtherExpenses,
  "in-entry": InEntryForm,
  "out-entry": OutEntryForm,
  "retailer order": AddOrderForm,
  "distributor order": AddOrderForDistributor,
};

const SearchBtn = ({
  btntext,
  display,
  initialData = null,
  isEditMode,
  formType,
  onSuccess,
}) => {
  const [modalType, setModalType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const normalizedType = btntext?.toLowerCase().replace("add", "").trim();

  useEffect(() => {
    if (initialData) {
      setModalType(normalizedType);
      setIsOpen(true);
    }
  }, [initialData, normalizedType]);

  const openModal = () => {
    setModalType(normalizedType);
    setIsOpen(true);
  };

  const FormComponent = formComponents[modalType];

  const handleFormSubmit = (data) => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Show the Add button if in create mode */}
      {!initialData && (
        <button
          onClick={openModal}
          className="bg-primary rounded-[8px] text-white py-1.5 px-3 text-[14px]"
        >
          {btntext}
        </button>
      )}

      {/* Modal renders conditionally */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={btntext}>
        {FormComponent ? (
          <FormComponent
            onSubmit={(data) => {
              handleFormSubmit(data);
              if (onSuccess) onSuccess(); // <-- Notify parent after form submission
            }}
            initialData={initialData}
            isEditMode={isEditMode}
          />
        ) : (
          <div>No form available</div>
        )}
      </Modal>
    </>
  );
};

export default SearchBtn;
