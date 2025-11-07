import { createSelector } from "@reduxjs/toolkit";

export const selectNotificationList = (state) => state.notification.list;

export const selectUnreadNotifications = createSelector(
  [selectNotificationList],
  (list) => list.filter((n) => !n.is_read)
);
