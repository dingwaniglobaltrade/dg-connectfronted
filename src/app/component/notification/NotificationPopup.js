"use client";

import { useState, useEffect } from "react";
import { notificationupdateread } from "@/app/store/Actions/notificationAction";
import { useDispatch } from "react-redux";

export default function NotificationPopup({ id, message, onClose }) {
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();

  console.log({ id });

  // Optional: auto-hide after 5 seconds
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     handleClose();
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, []);
  const unreadIds = id;

  const handleClose = () => {
    setVisible(false);

    // Call parent callback
    if (onClose) onClose(unreadIds);
    console.log({ unreadIds });

    // Dispatch Redux action to mark notification as read
    if (unreadIds) {
      dispatch(notificationupdateread([unreadIds]));
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed top-5 right-5 z-50 w-80 p-4 bg-[#dc2f02] text-white border shadow-lg rounded-lg flex justify-between items-start">
      <div className="text-sm ">{message}</div>
      <button
        onClick={handleClose}
        className="ml-4 text-white hover:font-bold font-semibold"
      >
        ✕
      </button>
    </div>
  );
}
