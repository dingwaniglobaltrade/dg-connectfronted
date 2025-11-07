import axios from "@/app/utils/axios";
import {
  fetchstaff,
  addnewstaff,
  assignroute,
  deletestaff,
  iserror,
} from "../Reducers/staffReducers";
import { toast } from "react-toastify";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

//fetch all the staff data
export const fetchAllStaffData = () => async (dispatch, getState) => {
  try {
    const token = getToken(); // get token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };
    console.log(token);

    const { data } = await axios.get("/portal/fetch-all-users", config);
    console.log("Fetched Staff:", data.data);
    dispatch(fetchstaff(data.data));
    return data;
  } catch (error) {
    console.error("Error in asyncaddadmin:", error.message);
    dispatch(iserror(error.message));
  }
};

//create staff
export const createNewStaff =
  (addStaffFormData) => async (dispatch, getState) => {
    const token = getToken(); // get token from localStorage

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let response;

      if (addStaffFormData.userType === "subadmin") {
        response = await axios.post(
          "/portal/register",
          addStaffFormData,
          config
        );
      } else if (addStaffFormData.userType === "salesperson") {
        response = await axios.post(
          "/salesperson/create",
          addStaffFormData,
          config
        );
      } else {
        toast.error("Invalid user type selected");
        return { success: false };
      }

      const data = response.data;

      if (data?.success) {
        dispatch(addnewstaff(data.data));
        toast.success("User Added successfully");
        return { success: true, data: data.data };
      } else {
        toast.error(data?.message || "Something went wrong");
        return { success: false };
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to register user");
      console.error("Register Staff Error:", error);
      return { success: false };
    }
  };

//Edit the Staff
// Edit the staff data
export const editStaff =
  (row, editedStaffData) => async (dispatch, getState) => {
    const token = getToken(); // get token from localStorage
    console.log("Editing Row:", row);
    console.log("Edited Data:", editedStaffData);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      let response;

      if (row.userType === "subadmin") {
        response = await axios.put(
          `/portal/update/${row.id}`,
          editedStaffData,
          config
        );
      } else if (row.userType === "salesperson") {
        response = await axios.put(
          `/salesperson/salesperson-updateDetiles/${row.id}`,
          editedStaffData,
          config
        );
      } else {
        // toast.error("Invalid user type selected");
        return { success: false };
      }
      console.log([response]);
      
      const data = response.data;
      console.log({data});
      
      if (response?.success) {
        dispatch(updateStaff(data.data));
        return { success: true, payload: data };
      } else {
        toast.error(data?.message || "Something went wrong");
        return { success: false };
      }
    } catch (error) {
      // toast.error(error?.response?.data?.message || "Failed to update user");
      console.error("Edit Staff Error:", error);
      return { success: false };
    }
};

//delete the staff data
export const deleteStaffData = (row) => async (dispatch, getState) => {
  const token = getToken(); // get token from localStorage
  console.log(row);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    let response;

    if (row.userType === "subadmin") {
      response = await axios.delete(`/portal/delete/${row.id}`, config);
    } else if (row.userType === "salesperson") {
      response = await axios.delete(
        `/salesperson/salesperson-delete/${row.id}`,
        config
      );
    } else {
      toast.error("Invalid user type selected");
      return { success: false };
    }

    const data = response.data;

    if (data?.success) {
      dispatch(deletestaff(data.data));
      toast.success("User registered successfully");
      return { success: true, payload: data };
    } else {
      toast.error(data?.message || "Something went wrong");
      return { success: false };
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to Delete user");
    console.error("Delete Staff Error:", error);
    return { success: false };
  }
};

//assign route to the salepserson

export const AssignRoutetoSalesperson =
  (id, routeID) => async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Send routeID as payload in request
      const payload = { routeID };

      const response = await axios.patch(
        `/salesperson/assign-route/${id}`,
        payload,
        config
      );

      dispatch(assignroute(routeID));

      return { success: true, payload: response.data };
    } catch (error) {
      dispatch(
        iserror(error?.response?.data?.message || "Failed to update route")
      );
      return {
        success: false,
        message: error?.response?.data?.message || "Error",
      };
    }
  };
