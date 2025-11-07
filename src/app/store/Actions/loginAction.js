import axios from "@/app/utils/axios";
import {
  loginuser,
  logoutuser,
  iserror,
  removeerror,
  currentuser,
  editUser,
} from "../Reducers/loginReducers";

export const asyncfetchlogin = (formData) => async (dispatch, getState) => {
  try {
    dispatch(removeerror()); // clear previous errors if any
    const { data } = await axios.post("/portal/login", formData); // send formData via POST
    console.log("Login Successful", data.user);

    // Save token (if API returns it)
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    // ✅ store only user details in redux
    dispatch(loginuser(data.user));

    return { success: true, payload: data };
  } catch (error) {
    console.error(
      "Login failed:",
      error?.response?.data?.message || error.message
    );
    dispatch(iserror(error?.response?.data?.message || "Login failed"));

    return {
      success: false,
      message: error?.response?.data?.message || "Login failed",
    };
  }
};

export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const { data } = await axios.post("/portal/fetch-current-user"); // your API endpoint
    dispatch(currentuser(data.user));
    console.log({current: data.user});

    return { success: true, payload: data.user };
  } catch (error) {
    console.error("Error fetching current user:", error);
    dispatch(iserror("Failed to fetch user"));
    return { success: false };
  }
};

export const updateCurrentUser = (id, payload) => async (dispatch, getState) => {
  console.log({ id });
  console.log(payload);
  try {
    const token = getToken(); // get token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };

    const result = await axios.put(`/portal/update/${id}`, payload, config);

    dispatch(editUser(result));
    return { success: true, payload: result };
  } catch (error) {
    dispatch(
      iserror(error?.response?.data?.message || "Failed to create product")
    );
    return {
      success: false,
      message: error?.response?.data?.message || "Error",
    };
  }
};

export const logoutCurrentUser = () => async (dispatch) => {
  try {
    const { data } = await axios.post("/portal/logout"); // sends token in header (see axios config)

    dispatch(logoutuser()); // correct action to reset state
    console.log("Logout successful:", data);

    return { success: true };
  } catch (error) {
    console.error(
      "Logout failed:",
      error?.response?.data?.message || error.message
    );
    dispatch(iserror("Logout failed"));
    return { success: false };
  }
};
