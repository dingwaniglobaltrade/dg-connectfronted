import axios from "@/app/utils/axios";
import {
  fetchEnquries,
  fetchEnquriesbyID,
  createnewEnquries,
  editExistingEnquries,
  iserror,
} from "../Reducers/enquriesReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const asyncfetchEnquries =
  ({ page, limit }) =>
  async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
        params: { page, limit },
      };
      const { data } = await axios.get("/enquirie/fetch-all-data", config);
      console.log({ data });

      dispatch(fetchEnquries(data.data));
      return data;
    } catch (error) {
      console.error(
        "Error in asyncfetchenquirie:",
        error.response?.data || error.message
      );
      dispatch(iserror(error.message));
    }
  };

//fetch the Enquries by the ide
export const fetchEnquiryByID = (id) => async (dispatch, getState) => {
  try {
    console.log({id});
    
    const token = getToken(); // get token from localStorage

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };
    const { data } = await axios.get(`/enquirie/fetch-by-theId/${id}`, config);
    dispatch(fetchEnquriesbyID(data.data));
    return data;
  } catch (error) {
    console.error(
      "Error in asyncfetchenquries:",
      error.response?.data || error.message
    );
    dispatch(iserror(error.message));
  }
};

//create Enquries
export const CreateEnquries = (formData) => async (dispatch, getState) => {
  try {
    const token = getToken(); // get token from localStorage

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };
    const { data } = await axios.post("/enquirie/create", formData, config);
    dispatch(createnewEnquries(data));
    return { success: true, payload: data };
  } catch (error) {
    dispatch(
      iserror(error?.response?.data?.message || "Failed to create Enqurie")
    );
    return {
      success: false,
      message: error?.response?.data?.message || "Error",
    };
  }
};

//update the Enquries
export const updatetheEnquriesStatus =
  (id, enquriesUpdatedData) => async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
        },
      };

      const data = await axios.put(
        `/enquirie/upate-enquirie-status/${id}`,
        enquriesUpdatedData,
        config
      );

      dispatch(editExistingEnquries(data.data));
      return { success: true, payload: data };
    } catch (error) {
      dispatch(
        iserror(error?.response?.data?.message || "Failed to Update Enquries")
      );
      return {
        success: false,
        message: error?.response?.data?.message || "Error",
      };
    }
  };
