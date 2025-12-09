import axios from "@/app/utils/axios";
import {
  setNotifications,
  setError,
  setLoading,
  markNotificationRead,
  allNotifications,
} from "../Reducers/notificationReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

//fetch only unread notification for login user popup
export const fetchunreadNotification = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const token = getToken();
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.get(`/notification/unread`, config);

    dispatch(setNotifications(data)); // stores in list
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    dispatch(setError(error.message));
  }
};

//fetch all the notifications recived by user
export const fetchnotificationbyID = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const token = getToken();
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.get(
      `/notification/fetch-all-notification-userwise/${id}`,
      config
    );

    dispatch(allNotifications(data)); // keep unread status intact
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    dispatch(setError(error.message));
  }
};

// ✅ Mark a specific notification as read
export const notificationupdateread = (unreadIds) => async (dispatch) => {

  try {
    const token = getToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    // Convert array to comma-separated string for backend route
    const idsParam = Array.isArray(unreadIds) ? unreadIds.join(",") : unreadIds;

    await axios.patch(
      `/notification/read-notification/${idsParam}/read`,
      {},
      config
    );

    // Update Redux store
    dispatch(markNotificationRead(unreadIds));
  } catch (error) {
    console.error("Error marking notifications as read:", error.message);
    dispatch(setError(error.message));
  }
};
