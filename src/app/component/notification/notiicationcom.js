"use client";
import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { fetchnotificationbyID } from "@/app/store/Actions/notificationAction";
import { useDispatch, useSelector } from "react-redux";

const NotificationDrawer = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.admin);
  const userId = user?.id;

  // Fetch notifications when drawer opens
  const notifications = useSelector((state) => state.notification.list);

  useEffect(() => {
    if (userId && show) {
      dispatch(fetchnotificationbyID(userId));
    }
  }, [userId, show, dispatch]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[999]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[80%] max-w-[350px] rounded-s-[20px] bg-white text-black shadow-lg p-4 overflow-y-auto transition-all duration-300 ease-in-out">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <h2 className="text-lg text-primary font-semibold">Notifications</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-700 hover:text-black"
          >
            <FiX className="text-primary" />
          </button>
        </div>

        {/* Notification Items */}
        <div className="mt-4 space-y-3 text-[14px]">
          {notifications.length > 0 ? (
            notifications.map((note) => (
              <div
                key={note.id}
                className={`p-3 rounded-lg border text-white bg-[#ff5400] border-red-200 transition cursor-pointer ${
                  note.status === 0 ? "bg-blue-50 border-blue-200" : ""
                }`}
              >
                {note.message}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-10">No notifications</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationDrawer;
