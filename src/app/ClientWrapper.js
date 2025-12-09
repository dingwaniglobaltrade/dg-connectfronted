"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchnotificationbyID,
  fetchunreadNotification,
} from "@/app/store/Actions/notificationAction";
import { initSocket } from "@/app/utils/socket";
import NotificationPopup from "@/app/component/notification/NotificationPopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectUnreadNotifications } from "@/app/utils/notificationSelectors";

export default function ClientWrapper({ children }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login.admin);
  const userId = user?.id;
  const token =
    user?.token ||
    (typeof window !== "undefined" && localStorage.getItem("token"));

  const [notifications, setNotifications] = useState([]);
  const unreadNotifications = useSelector(selectUnreadNotifications);

  // console.log("Unread Notifications:", unreadNotifications);

  /**
   *Fetch unread notifications on login / page load
   */
  useEffect(() => {
    if (userId && token) {
      dispatch(fetchunreadNotification(userId));
    }
  }, [dispatch, userId, token]);

  /**
   *Whenever unread notifications are fetched → show them as popups
   */
  useEffect(() => {
    if (unreadNotifications.length > 0) {
      setNotifications((prev) => {
        // Avoid duplicates: only add new ones that aren't already shown
        const existingIds = new Set(prev.map((n) => n.id));
        const newOnes = unreadNotifications.filter(
          (n) => !existingIds.has(n.id)
        );
        return [...prev, ...newOnes];
      });
    }
  }, [unreadNotifications]);

  /**
   *Initialize Socket & Real-time listener
   */
  useEffect(() => {
    if (!userId || !token) return;

    dispatch(fetchnotificationbyID(userId));

    const socket = initSocket(token);

    const handleConnect = () => {
      console.log("✅ Socket connected:");
      socket.emit("join", userId);
    };

    const handleNotification = (data) => {
      console.log("📨 New notification received:");
      if (data?.user_id === userId) {
        setNotifications((prev) => [...prev, data]);
        dispatch({ type: "ADD_NOTIFICATION", payload: data });
      }
    };

    socket.on("connect", handleConnect);
    socket.on("new_notification", handleNotification);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("new_notification", handleNotification);
    };
  }, [userId, token, dispatch]);

//  *Handle popup close → remove from local popup state

  const handleClose = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    // Optional: dispatch(markAsRead(id)) to mark as read in DB
  };

  return (
    <>
      {children}

      {/* Notification Popups */}
      {notifications.map((n) => (
        <NotificationPopup
          key={n.id}
          message={n.message}
          id={n.id}
          onClose={() => handleClose(n.id)}
        />
      ))}

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </>
  );
}
