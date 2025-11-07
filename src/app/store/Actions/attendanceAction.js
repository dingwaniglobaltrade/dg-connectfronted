import axios from "@/app/utils/axios";
import {
  fetchAttendance,
  salesmanwiseattendance,
  addAttendance,
  editAttendance,
  deleteAttendance,
  iserror,
} from "../Reducers/attendanceReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const fetchAttendanceAction =
  ({ date, page = 1, limit = 10 }) =>
  async (dispatch, getState) => {
    try {
      console.log({ date, page, limit }); // keep console.log inside

      const token = getToken(); // get token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
        params: { date, page, limit }, // query params go here
      };

      const { data } = await axios.get(
        `/attendance/fetch-all-attendance`,
        config
      );
       console.log({data:data.data});
       
      dispatch(fetchAttendance(data.data));
      return data;
    } catch (error) {
      console.error("Error Message", error.message);
      dispatch(iserror(error.message));
    }
  };

//fetch all attendance salesperson wise
export const fetchsalespersonwiseattendance =
  ({ id, page = 1, limit = 10 }) =>
  async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
        params: { id, page, limit },
      };
      console.log({ id });

      // 👇 attach page & limit as query params
      const { data } = await axios.get(
        `/attendance/fetchSaleman-attendance`,
        config
      );
      console.log({ data });

      // update redux state if needed
      dispatch(salesmanwiseattendance(data.data));
      return data; // { success, total, page, limit, totalPages, data }
    } catch (error) {
      console.error("Error in fetchsalespersonwiseattendance:", error.message);
      dispatch(iserror(error.message));
    }
  };

//create attendance by the admin & subadmin
export const CreateAttendaneAction =
  ({ id, salespersonForm }) =>
  async (dispatch, getState) => {
    try {
      const token = getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `/attendance/create-attendance/${id}`,
        salespersonForm,
        config
      );

      dispatch(addAttendance(data));
      return { success: true, payload: data };
    } catch (error) {
      console.error("Error in CreateAttendaneAction:", error.message);
      dispatch(iserror(error.message));
    }
  };

//create In Attendance
export const InEnteryOFSalespersom =
  (InEnteryDataForm) => async (dispatch, getState) => {
    try {
      const token = getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "/attendance/In-entry",
        InEnteryDataForm,
        config
      );

      dispatch(addAttendance(data));
      return { success: true, payload: data };
    } catch (error) {
      console.error("Error in CreateAttendaneAction:", error.message);
      dispatch(iserror(error.message));
    }
  };

//edit attendance detailes
export const OutEntryOfSalesperson =
  (id, updatedData) => async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
      };

      const data = await axios.patch(
        `/attendance/update-attandace-status/${id}`,
        updatedData,
        config
      );

      dispatch(editAttendance(data));
      return { success: true, payload: data };
    } catch (error) {
      dispatch(
        iserror(error?.response?.data?.message || "Failed to update retailer")
      );
      return {
        success: false,
        message: error?.response?.data?.message || "Error",
      };
    }
  };

//edit attendance detailes
export const editattendancedetailes =
  (id, updatedData) => async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
      };

      const data = await axios.patch(
        `/attendance/update-attandace-status/${id}`,
        updatedData,
        config
      );

      dispatch(editAttendance(data));
      return { success: true, payload: data };
    } catch (error) {
      dispatch(
        iserror(error?.response?.data?.message || "Failed to update retailer")
      );
      return {
        success: false,
        message: error?.response?.data?.message || "Error",
      };
    }
  };

//delete product detailes
export const deleteSalespersonAttendance =
  (id) => async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
      };

      const result = await axios.delete(
        `/attendance/delete-attendance/${id}`,
        config
      );

      dispatch(deleteAttendance(result.data));
      return { success: true, payload: result.data };
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
