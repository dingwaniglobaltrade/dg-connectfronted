// components/Modal.js
"use client";
import React from "react";
import Image from "next/image";
import closeIcon from "@/icons/form/close.svg";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-xl shadow-xl lg:w-[50%] md:w-[60%] w-[95%] max-h-[90%]">
        <div className="flex justify-between items-center mb-4 bg-primary px-6 rounded-t-xl">
          <h2 className="text-[15px] font-semibold text-white py-3">{title}</h2>
          <button onClick={onClose} className="bg-white px-[2px] py-[2px] rounded-full">
            <Image src={closeIcon} alt="close icon" height={20} width={20} />{" "}
          </button>
        </div>
        <div className="px-6 pt-2 overflow-y-auto overscroll-auto" style={{ maxHeight: "50vh" }}>
        {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;


